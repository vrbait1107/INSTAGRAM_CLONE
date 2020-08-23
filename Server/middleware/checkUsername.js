const checkUsername = (req, res, next) => {
  let username = req.body.username;

  User.findOne({ username: username }, function (err, data) {
    if (err) throw err;
    if (data) {
      return res.json({ error: "Username Already Exist" });
    } else {
      next();
    }
  });
};

module.exports = checkUsername;
