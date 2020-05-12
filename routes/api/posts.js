const express = require('express');
const fileUpload = require('express-fileUpload');

const router = express.Router();
router.use(fileUpload());
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');
const Users = require('../../models/Users');
const Profile = require('../../models/Profile');

//@route Get api/post
//desc Test route
//@access Privae
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await Users.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        video: req.files.file,
        avatar: user.avatar,
        user: req.user.id,
      });

      file.mv('${_dirname}/client/public/uploads/${file.name}', (err) => {
        if (err) {
          consloe.error(err);
          return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: '/uploads/${file.name}' });
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route Get api/posts
//@desc get all posts
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route Get api/posts/: id
//@desc get post
//@access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        msg: 'Post not found',
      });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Post not found',
      });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
