const mongoose = require("mongoose");
const validator = require("validator");
const Post = require("./postModel");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  surname: {
    type: String,
    required: [true, "Please enter a surname"],
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  nick: {
    type: String,
    required: [true, "Please enter a nick"],
    unique: true,
    lowercase: true,
    minlength: 5,
    maxlenght: 20,
    validate: [validator.isAlphanumeric, "Please enter a valid nick"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
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

userSchema.pre("save", async function (next) {
  // Run before save() and create()
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12); // Hash password with cost of 12
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
