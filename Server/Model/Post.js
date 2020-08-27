const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "No Photo",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", Post);
