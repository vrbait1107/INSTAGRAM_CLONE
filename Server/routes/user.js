const express = require("express");
const router = express.Router();
const Post = require("../Model/Post");
const User = require("../Model/User");
const checkValidUser = require("../middleware/checkValidUser");

router.get("/profile/:username", checkValidUser, (req, res, next) => {
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

router.put("/follow", checkValidUser, (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    User.findByIdAndUpdate(
      result._id,
      {
        $push: { follower: req.user._id },
      },
      { $new: true }
    )
      .then((result2) => {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { follower: req.body.username },
          },
          { $new: true }
        )
          .then((result3) => {
            res.status(200).json({ result: result3 });
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      })
      .catch((err) => {
        return res.status(422), json({ error: err });
      });
  });
});

router.put("/unfollow", checkValidUser, (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    User.findByIdAndUpdate(
      result._id,
      {
        $pull: { follower: req.user._id },
      },
      { $new: true }
    )
      .then((result2) => {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { follower: req.body.username },
          },
          { $new: true }
        )
          .then((result3) => {
            res.status(200).json({ result: result3 });
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      })
      .catch((err) => {
        return res.status(422), json({ error: err });
      });
  });
});

module.exports = router;
