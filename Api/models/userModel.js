const mongoose = require("mongoose");
const validator = require("validator");
const Post = require("./postModel");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    match: [
      /^[A-Z][a-ząćęłńóśźż]+(\s[A-Z][a-ząćęłńóśźż]+)?$/,
      "Please enter a valid first name. The first name should start with an uppercase letter, followed by one or more lowercase letters (including Polish characters: ą, ć, ę, ł, ń, ó, ś, ź, ż). If the first name consists of more than one word, each word should start with an uppercase letter and be separated by a single space.",
    ],
  },
  surname: {
    type: String,
    required: [true, "Please enter a surname"],
    match: [
      /^[A-Z][a-ząćęłńóśźż]+(-[A-Z][a-ząćęłńóźż]+)?$/,
      "Please enter a valid last name. The last name should start with an uppercase letter, followed by one or more lowercase letters (including Polish characters: ą, ć, ę, ł, ń, ó, ś, ź, ż). If the last name includes a hyphenated component, it should follow the same pattern of starting with an uppercase letter and followed by lowercase letters.",
    ],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
    lowercase: true,
  },
  nick: {
    type: String,
    required: [true, "Please enter a nick"],
    match: [
      /^[a-z0-9]{5,25}$/,
      "Please enter a valid nick. The nick can contain only lowercase letters (a-z) and numbers (0-9). It should have a length between 5 and 25 characters.",
    ],
    unique: true,
    minlength: 5,
    maxlenght: 25,
  },
  password: {
    type: String,
    required: [
      true,
      "Please enter a password. Password must contain at least 8 characters",
    ],
    minlength: 8,
    select: false, // Don't show password in response
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
    select: false,
  },
  passwordChangedAt: Date,
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.virtual("fullName").get(function () {
  return `${this.name} ${this.surname}`;
});

userSchema.pre("save", async function (next) {
  // Run before save() and create()
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  givenPassword,
  userPassword
) {
  return await bcrypt.compare(givenPassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
