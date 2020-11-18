const express = require("express");
const router = express.Router();
const Post = require("../Model/Post");
const User = require("../Model/User");
const checkValidUser = require("../middleware/checkValidUser");

router.get("/profile/:username", (req, res, next) => {
  User.findOne({ username: req.params.username })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: user._id })
        .populate("postedBy", "_id username")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.status(200).json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not Found" });
    });
});

module.exports = router;
