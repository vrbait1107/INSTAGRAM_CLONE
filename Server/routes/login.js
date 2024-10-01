const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpStatusCode } = require("axios");
require('dotenv').config();


router.post("/login", async function (req, res, next) {

  console.log(process.env.JWT_SECRET_TOKEN);

  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(HttpStatusCode.Unauthorized).json({
      status: false,
      message: "Check Your Credentials"
    });
  }

  const { _id, name, email, username, about, followers, following, profileImage } = user;
  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    return res.status(HttpStatusCode.Unauthorized).json({
      status: false,
      message: "Check Your Credentials"
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN);

  return res.status(HttpStatusCode.Ok).json({
    status: true,
    data: {
      user:
      {
        _id, name, username, email, about, followers, following, profileImage
      },
      token
    }
  });

});

module.exports = router;
