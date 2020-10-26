const { Router } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWTSECRET } = require('../config');
const User = require('../models/User');
const requireLogin = require('../middlewares/requireLogin');

const {
   email: emailValidator,
   login: loginValidator,
   password: passwordValidator,
   checkEmailNotExists,
   checkLoginNotExists,
   checkEmailExists,
   comparePasswords,
} = require('../validators');

const router = Router();

router.get('/', requireLogin, (req, res) => {
   res.status(200).json(req.user.getPublicFields());
});

router.post(
   '/signup',
   [
      emailValidator,
      loginValidator,
      passwordValidator,
      checkEmailNotExists,
      checkLoginNotExists,
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const { email, login, password } = req.body;

      try {
         const hashPassword = await bcrypt.hash(password, 10);
         const user = new User({ email, login, password: hashPassword });
         res.status(201).json((await user.save()).getPublicFields());
      } catch (error) {
         res.status(500).json({ errors: ['Ошибка на сервере'] });
      }
   }
);

router.post(
   '/signin',
   [emailValidator, passwordValidator, checkEmailExists, comparePasswords],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const token = await jwt.sign({ _id: req.user._id }, JWTSECRET);
      const user = req.user.getPublicFields();
      user.token = token;
      res.status(200).json(user);
   }
);

module.exports = router;
