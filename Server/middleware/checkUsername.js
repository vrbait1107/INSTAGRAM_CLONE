const { HttpStatusCode } = require("axios");
const User = require("../Model/User");
const responseUtils = require('../helpers/response');

const checkUsername = async (request, response, next) => {
  const username = request.body.username;

  const user = await User.findOne({ username: username });

  if (user) {
    return responseUtils.error(
      response,
      HttpStatusCode.Conflict,
      "You need to be logged in to access this feature. Please log in to continue."
    );
  }

  next();

};

module.exports = checkUsername;
