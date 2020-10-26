const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { JWTSECRET } = require('../config');

const requireLogin = async (req, res, next) => {
   const { authorization } = req.headers;

   if (!authorization) {
      return res.status(401).json({ error: 'Токен отсутствует' });
   }

   const token = authorization.replace('Bearer ', '');

   let _id;

   try {
      _id = (await jwt.verify(token, JWTSECRET))._id;
   } catch (error) {
      return res.status(401).json({ error: 'Некорретный токен' });
   }

   try {
      const user = await User.findById(_id);
      if (!user) {
         return res.status(404).json({ error: 'Пользователь не найден' });
      }
      req.user = user;
   } catch (error) {
      res.status(500).json({ error: 'Проблемы с сервером' });
   }

   next();
};

module.exports = requireLogin;
