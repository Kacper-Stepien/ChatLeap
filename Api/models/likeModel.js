const mongoose = require("mongoose");
const validator = require("validator");
const Post = require("./postModel");
const User = require("./userModel");

const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: [true, "Please enter a post ID"],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please enter a user ID"],
  },
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
