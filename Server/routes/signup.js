const express = require("express");
const router = express.Router();
const User = require("../Model/User");

router.post("/signup", (req, res, next) => {
  let { username, email, name, password } = req.body;
  if (!username || !email || !name || !password) {
    res.json({ error: "Please fill all the field" });
  }

  User.findOne({ username: username }, (err, data) => {
    if (err) throw err;
    if (data) {
      res.status(422).json({ error: "Username Already Exist" });
    }

    const user = new User({
      username,
      email,
      name,
      password,
    });

    user.save((err, data) => {
      if (err) throw err;
      if (data) {
        res.status(200).json({ success: "User Successfully Registered" });
      }
    });
  });
});

module.exports = router;
