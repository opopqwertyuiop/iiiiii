const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const validators = {
   email: body('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Введите корректный email'),

   checkEmailNotExists: body('email').custom((email) => {
      return User.findOne({ email }).then((user) => {
         if (user !== null) {
            throw new Error('email занят');
         }
      });
   }),

   checkEmailExists: body('email').custom((email, { req }) => {
      return User.findOne({ email }).then((user) => {
         if (user === null) {
            throw new Error('Пользователь не найден');
         }
         req.user = user;
      });
   }),

   login: body('login')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Длина логина должна быть не менее 4-ёх символов'),

   checkLoginNotExists: body('login').custom((login) => {
      return User.findOne({ login }).then((user) => {
         if (user !== null) {
            throw new Error('логин занят');
         }
      });
   }),

   password: body('password')
      .isLength({ min: 5 })
      .withMessage('Длина пароля должна быть не менее 5-ти символов'),

   comparePasswords: body('password').custom(async (password, { req }) => {
      if (!req.user) {
         return;
      }
      const isCompared = await bcrypt.compare(password, req.user.password);
      if (!isCompared) {
         throw new Error('Неверный пароль');
      }
   }),

   postTitle: body('title')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Введите название поста'),
   postBody: body('body')
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Максимальная длина описания 1000 символов'),
   postPhoto: body('photo')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Введите ссылку на фото'),
};

module.exports = validators;
