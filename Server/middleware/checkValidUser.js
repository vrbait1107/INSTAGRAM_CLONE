const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const { jwtSecret } = require("../routes/keys");

const checkValidUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You must logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtSecret, function (err, payload) {
    if (err) {
      return res.status(401).json({ error: "You must logged in" });
    }

    const { _id } = payload;

    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};

module.exports = checkValidUser;
