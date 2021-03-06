const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const User = new Schema({
  username: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  about: {
    type: String,
    default: "I am Instagram User",
  },

  followers: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],

  profileImage: {
    type: String,
    default: "defaultUser.png",
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", User);
