const express = require("express");
const router = express.Router();
const Post = require("../Model/Post");
const checkValidUser = require("../middleware/checkValidUser");

router.post("/createPost", checkValidUser, function (req, res, next) {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.json({ error: "Please add all fields" });
  }

  console.log(req.user);

  req.user.password = undefined;

  let post = new Post({
    title,
    body,
    postedBy: req.user,
  });

  post.save(function (err, data) {
    if (err) throw err;
    res.json({ post: data });
  });
});

module.exports = router;
