const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./keys");

router.post("/login", function (req, res, next) {
  let { username, password } = req.body;

  User.findOne({ username: username }, function (err, data) {
    if (err) throw err;

    if (data) {
      let hashPassword = data.password;
      const { _id, name, email } = data;

      if (bcrypt.compareSync(password, hashPassword)) {
        const token = jwt.sign({ _id: data._id }, jwtSecret);
        res.json({ token, user: { _id, name, email } });
      } else {
        res.status(422).json({ error: "Check Your Credentials" });
      }
    } else {
      res.status(422).json({ error: "Check Your Credentials" });
    }
  });
});

module.exports = router;
