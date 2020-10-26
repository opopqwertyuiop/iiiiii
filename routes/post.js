const express = require('express');
const { validationResult } = require('express-validator');

const Post = require('../models/Post');
const {
   postTitle: postTitleValidator,
   postBody: postBodyValidator,
   postPhoto: postPhotoValidator,
} = require('../validators');
const requireLogin = require('../middlewares/requireLogin');

const router = express.Router();

router.post(
   '/createpost',
   requireLogin,
   [postTitleValidator, postBodyValidator, postPhotoValidator],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const { title, body, photo } = req.body;
      const post = new Post({ title, body, photo, author: req.user._id });
      res.status(201).json(await post.save());
   }
);

router.get('/myposts', requireLogin, async (req, res) => {
   res.status(200).json(await Post.find({ author: req.user._id }));
});

module.exports = router;
