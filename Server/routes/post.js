const express = require("express");
const router = express.Router();
const Post = require("../Model/Post");
const checkValidUser = require("../middleware/checkValidUser");
const upload = require("../middleware/multer");

router.post("/createPost", upload, function (req, res, next) {
  const { title, body, file } = req.body;

  const imagesName = req.file.filename;

  if (!title || !body || !file) {
    return res.json({ error: "Please add all fields" });
  }

  // req.user.password = undefined;

  let post = new Post({
    title,
    body,
    photo: imageName,
  });

  post.save(function (err, data) {
    if (err) throw err;
    res.json({ post: data });
  });
});

module.exports = router;
