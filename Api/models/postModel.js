const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");
const Comment = require("./commentModel");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Proszę podać tekst posta"],
    minlength: [3, "Post musi mieć minimum 3 znaki"],
    maxlength: [250, "Post może mieć maksymalnie 200 znaków"],
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
