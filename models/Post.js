const mongoose = require('mongoose');

const schema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         maxlength: 255,
      },
      body: {
         type: String,
      },
      author: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'User',
         required: true,
      },
      photo: {
         type: String,
         required: true,
      },
      likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
   },
   { timestamps: true }
);

const model = mongoose.model('Post', schema);

module.exports = model;
