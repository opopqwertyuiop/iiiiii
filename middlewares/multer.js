const path = require('path');

const multer = require('multer');

const checkFileType = (req, file, cb) => {
   const filetypes = /jpeg|jpg|png/;
   const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
   );
   const mimetype = filetypes.test(file.mimetype);
   if (mimetype && extname) {
      return cb(null, true);
   } else {
      cb(
         { msg: 'Размер не более 1мб. Допустимые типы: jpeg, jpg, png' },
         false
      );
   }
};

const storageConfig = multer.diskStorage({
   destination: './uploads',
   filename: (req, file, cb) => {
      cb(
         null,
         file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      );
   },
});

const uploadAvatar = multer({
   storage: storageConfig,
   fileFilter: checkFileType,
}).single('file');
// s
module.exports.uploadAvatar = uploadAvatar;
