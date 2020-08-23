const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const checkUsername = require("../middleware/checkUsername");

router.post("/signup", checkUsername, (req, res, next) => {
  let { username, email, name, password } = req.body;

  if (!username || !email || !name || !password) {
    return res.status(422).json({ error: "Please fill all the field" });
  }

  const user = new User({
    username,
    email,
    name,
    password: bcrypt.hashSync(password, 10),
  });

  user.save((err, data) => {
    if (err) throw err;
    if (data) {
      res.status(200).json({ success: "User Successfully Registered" });
    }
  });
});

module.exports = router;
