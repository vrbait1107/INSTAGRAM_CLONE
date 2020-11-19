const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const checkUsername = require("../middleware/checkUsername");
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

router.post("/signup", upload, checkUsername, (req, res, next) => {
  let { username, email, name, password } = req.body;

  let profileImage = req.file.filename;

  if (!username || !email || !name || !password || !profileImage) {
    return res.status(422).json({ error: "Please fill all the field" });
  }

  const user = new User({
    username,
    email,
    name,
    profileImage,
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
