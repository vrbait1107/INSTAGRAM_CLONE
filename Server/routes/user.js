const express = require("express");
const router = express.Router();
const Post = require("../Model/Post");
const User = require("../Model/User");
const checkValidUser = require("../middleware/checkValidUser");
const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: `../Client/public/uploads/profileImages`,
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: Storage,
}).single("file");

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
        $push: { followers: req.user._id },
      },
      { new: true }
    )
      .then((result2) => {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { following: result._id },
          },
          { new: true }
        )
          .select("-password")
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
        $pull: { followers: req.user._id },
      },
      { new: true }
    )
      .then((result2) => {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { following: result._id },
          },
          { new: true }
        )
          .select("-password")
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

router.put("/updateProfile", upload, (req, res, next) => {
  User.findByIdAndUpdate(req.body._id, {
    $set: { profileImage: req.file.filename },
  })
    .then((data) => {
      res.status(200).json({ result: data });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

module.exports = router;
