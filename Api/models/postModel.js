const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");
const Comment = require("./commentModel");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please enter the text of the post"],
    minlength: [3, "The post must be at least 3 characters long"],
    maxlength: [250, "The post can be up to 200 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
