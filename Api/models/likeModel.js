const mongoose = require("mongoose");
const validator = require("validator");
const Post = require("./postModel");
const User = require("./userModel");

const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: [true, "Proszę podać post"],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Proszę podać użytkownika"],
  },
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
