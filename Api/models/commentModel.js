const mongoose = require("mongoose");
const validator = require("validator");
const Post = require("./postModel");
const User = require("./userModel");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Proszę podać tekst komentarza"],
    minlength: [3, "Komentarz musi mieć minimum 3 znaki"],
    maxlength: [100, "Komentarz może mieć maksymalnie 200 znaków"],
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
