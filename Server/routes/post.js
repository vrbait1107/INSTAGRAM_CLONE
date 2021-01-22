const express = require("express");
const router = express.Router();
const Post = require("../Model/Post");
const checkValidUser = require("../middleware/checkValidUser");
const upload = require("../middleware/multer");

// ------------------------------->> SHOW POST

router.get("/allPost", checkValidUser, function (req, res, next) {
  Post.find({})
    .populate("postedBy", "_id username profileImage")
    .populate("comments.postedBy", "_id username")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

// ------------------------------->> SHOW POST

router.post("/subPost", checkValidUser, function (req, res, next) {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id username profileImage")
    .populate("comments.postedBy", "_id username")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

// ------------------------------->> SAVE IMAGE

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
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ post: data });
    }
  });
});

// ------------------------------->> LIKE FUNCTIONALITY

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

// ------------------------------->> UNLIKE FUNCTIONALITY

router.put("/unlike", checkValidUser, function (req, res, next) {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
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

// ------------------------------->> COMMENT FUNCTIONALITY

router.put("/comment", checkValidUser, function (req, res, next) {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("postedBy", "_id username profileImage")
    .populate("comments.postedBy", "_id username")
    .exec((err, data) => {
      if (err) {
        res.status(422).json({ error: err });
      } else {
        res.status(200).json({ result: data });
      }
    });
});

// ------------------------------->> COMMENT FUNCTIONALITY

router.put("/uncomment", checkValidUser, function (req, res, next) {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { comments: { _id: req.body.commentId } },
    },
    { new: true }
  )
    .populate("postedBy", "_id username profileImage")
    .populate("comments.postedBy", "_id username")
    .exec((err, data) => {
      if (err) {
        res.status(422).json({ error: err });
      } else {
        res.status(200).json({ result: data });
      }
    });
});

// ----------------------------->> DELETE POST OPERATION

router.delete("/deletePost/:postId", checkValidUser, (req, res) => {
  Post.findById({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        if (post.postedBy._id.toString() === req.user._id.toString()) {
          post
            .remove()
            .then((result) => {
              res.status(200).json({ result });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    });
});

module.exports = router;
