const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const responseUtils = require('../helpers/response');
require('dotenv').config();
const { HttpStatusCode } = require("axios");

const checkValidUser = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return responseUtils.error(
      response,
      HttpStatusCode.Unauthorized,
      "You need to be logged in to access this feature. Please log in to continue."
    );
  }

  try {
    const token = authorization.replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

    if (!data) {
      return responseUtils.error(
        response,
        HttpStatusCode.Unauthorized,
        "You need to be logged in to access this feature. Please log in to continue."
      );
    }

    const user = await User.findById(data._id);

    if (!user) {
      return responseUtils.error(
        response,
        HttpStatusCode.Unauthorized,
        "You need to be logged in to access this feature. Please log in to continue."
      );
    }

    request.user = user;
    next();

  } catch (error) {
    return responseUtils.error(
      response,
      HttpStatusCode.InternalServerError,
      "Something Went Wrong, Please Try Again Later"
    );
  }
};

module.exports = checkValidUser;
