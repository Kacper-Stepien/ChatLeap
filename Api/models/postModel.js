const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");
const Comment = require("./commentModel");
const Like = require("./likeModel");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please enter the text of the post"],
    minlength: [1, "The post must be at least 1 characters long"],
    maxlength: [280, "The post can be up to 280 characters long"],
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
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Like",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
