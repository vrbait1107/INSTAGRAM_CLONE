const express = require("express");
const router = express.Router();
const Post = require("../Model/Post");
const checkValidUser = require("../middleware/checkValidUser");
const upload = require("../middleware/multer");

router.post("/allPost", checkValidUser, function (req, res, next) {
  Post.find({})
    .populate("postedBy", "_id username")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createPost", checkValidUser, upload, function (req, res, next) {
  const { title, body } = req.body;

  const imagesName = req.file.filename;

  if (!title || !body) {
    return res.json({ error: "Please add all fields" });
  }

  req.user.password = undefined;

  let post = new Post({
    title,
    body,
    photo: imagesName,
    postedBy: req.user,
  });

  post.save(function (err, data) {
    if (err) throw err;
    res.json({ post: data });
  });
});

router.post("/myPosts", checkValidUser, function (req, res, next) {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id username")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/likes", checkValidUser, function (req, res, next) {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, data) => {
    if (err) {
      res.status(422).json({ error: err });
    } else {
      res.status(200).json({ result: data });
    }
  });
});

module.exports = router;
