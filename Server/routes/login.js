const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");

router.post("/login", function (req, res, next) {
  let { username, password } = req.body;

  User.findOne({ username: username }, function (err, data) {
    if (err) throw err;

    if (data) {
      let hashPassword = data.password;

      if (bcrypt.compareSync(password, hashPassword)) {
        res.json({ success: "You are Successfully Logged In" });
      } else {
        res.json({ error: "Check Your Credentials" });
      }
    } else {
      res.json({ error: "Check Your Credentials" });
    }
  });
});

module.exports = router;
