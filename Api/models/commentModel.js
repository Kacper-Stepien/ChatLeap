const mongoose = require("mongoose");
const validator = require("validator");
const Post = require("./postModel");
const User = require("./userModel");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please enter comment text"],
    minlength: [3, "The comment must be at least 3 characters long"],
    maxlength: [150, "The comment can be up to 150 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
