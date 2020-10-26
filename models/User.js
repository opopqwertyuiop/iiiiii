const mongoose = require('mongoose');

const schema = new mongoose.Schema(
   {
      login: {
         type: String,
         required: true,
         unique: true,
         trim: true,
         lowercase: true,
         minlength: 4,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: true,
         minlength: 5,
      },
      avatar: {
         type: String,
         default:
            'https://scontent-hel3-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-hel3-1.cdninstagram.com&_nc_ohc=KCb1hHB1LwIAX-wbh-X&oh=49b244bd94caee62d41126e3de766812&oe=5FBDBE0F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2',
      },
   },
   { timestamps: true }
);

schema.methods.getPublicFields = function () {
   const publicFields = [
      '_id',
      'email',
      'login',
      'createdAt',
      'updatedAt',
      'avatar',
   ];
   const ret = {};
   publicFields.forEach((field) => {
      ret[field] = this[field];
   });
   return ret;
};

const model = mongoose.model('User', schema);

module.exports = model;
