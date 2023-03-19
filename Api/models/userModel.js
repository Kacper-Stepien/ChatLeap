const mongoose = require("mongoose");
const validator = require("validator");
const Post = require("./postModel");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
    minlength: 5,
    maxlenght: 20,
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
