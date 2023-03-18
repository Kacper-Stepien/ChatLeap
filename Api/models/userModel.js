const mongoose = require("mongoose");
const validator = require("validator");
const Post = require("./postModel");

const userSchame = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Proszę podać imię"],
  },
  surname: {
    type: String,
    required: [true, "Proszę podać nazwisko"],
  },
  email: {
    type: String,
    required: [true, "Proszę podać email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Proszę podać poprawny email"],
  },
  nick: {
    type: String,
    required: [true, "Proszę podać nick"],
    unique: true,
    lowercase: true,
    validate: [validator.isAlphanumeric, "Proszę podać poprawny nick"],
  },
  password: {
    type: String,
    required: [true, "Proszę podać hasło"],
    minlength: 8,
    select: false, // Don't show password in response
  },
  passwordConfirm: {
    type: String,
    required: [true, "Proszę potwierdzić hasło"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Hasła nie są takie same",
    },
  },
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  ],
});

const User = mongoose.model("User", userSchame);
module.exports = User;
