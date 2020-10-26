const express = require('express');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const router = express.Router();

const User = require('../models/User');

const { uploadAvatar } = require('../middlewares/multer');
const requireLogin = require('../middlewares/requireLogin');
const { login: loginValidator, checkLoginNotExists } = require('../validators');

router.post('/avatar', requireLogin, async (req, res) => {
   uploadAvatar(req, res, (err, file) => {
      if (err) {
         res.status(422).json({ errors: [err] });
      } else {
         console.log(req.file);
         if (req.file.size > 1 * 1024 * 1024) {
            return res.status(422).json({
               errors: [
                  {
                     msg:
                        'Размер не более 1мб. Допустимые типы: jpeg, jpg, png',
                  },
               ],
            });
         }
         User.findByIdAndUpdate(
            req.user._id,
            {
               avatar: `http://localhost:5001/uploads/${req.file.filename}`,
            },
            { new: true }
         )
            .then((response) => {
               console.log(response);
               res.json(response);
            })
            .catch((error) => {
               res.status(500).send({
                  errors: [{ msg: 'Проблемы с сервером' }],
               });
            });
      }
   });
});

router.post(
   '/login',
   requireLogin,
   [loginValidator, checkLoginNotExists],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).send({ errors });
      }
      User.findByIdAndUpdate(
         req.user._id,
         {
            login: req.body.login,
         },
         { new: true }
      )
         .then((response) => {
            console.log(response);
            res.json(response);
         })
         .catch((error) => {
            res.status(500).send({
               errors: [{ msg: 'Проблемы с сервером' }],
            });
         });
   }
);

router.post('/password', requireLogin, async (req, res) => {
   const { oldPassword, newPassword, newNewPassword } = req.body;
   console.log(oldPassword, newPassword, newNewPassword);
   const compare1 = await bcrypt.compare(oldPassword, req.user.password);
   if (!compare1) {
      return res.status(422).json({ errors: [{ msg: 'Неверный пароль' }] });
   }
   if (newPassword.length < 5) {
      return res.status(422).json({
         errors: [{ msg: 'Длина пароля должна быть не менее 5-ти символов' }],
      });
   }
   if (newPassword !== newNewPassword) {
      return res.status(422).json({ errors: [{ msg: 'Пароли не совпадают' }] });
   }
   const password = await bcrypt.hash(newPassword, 10);
   const user = await User.findByIdAndUpdate(
      req.user._id,
      { password },
      { new: true }
   );
   res.status(200).json(user);
});

module.exports = router;
