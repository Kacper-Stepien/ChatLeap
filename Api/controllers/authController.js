const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const emailExists = async (email) => {
  return User.exists({ email });
};

const nickExists = async (nick) => {
  return User.exists({ nick });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, surname, email, nick, password, passwordConfirm } = req.body;
  if (await emailExists(email)) {
    return next(
      new AppError("User with given email address already exists", 400)
    );
  }
  if (await nickExists(nick)) {
    return next(new AppError("User with given nickname already exists", 400));
  }
  const newUser = await User.create({
    name,
    surname,
    email,
    nick,
    password,
    passwordConfirm,
  });

  newUser.password = undefined; // Hide password from response
  newUser.passwordConfirm = undefined;

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please enter your email and password", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(
      new AppError("User with given email address doesn't exists", 404)
    );
  }
  const correctData = await user.correctPassword(password, user.password);
  if (!correctData) {
    return next(new AppError("Password is incorrect", 401));
  }

  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  return res.status(200).json({
    status: "success",
    token,
    data: user,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // authorization: Bearer dodfdfso394jfdf - we need to get token from this string, so we split it by space and take second element
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You're not logged in. Please login", 401));
  }

  // 2) Validate token
  let decodedToken;

  decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);

  if (!decodedToken) {
    return next(new AppError("You're not logged in. Please login", 401));
  }

  // 3) Check if user still exists
  const freshUser = await User.findById(decodedToken.id);
  if (!freshUser) {
    return next(new AppError("The user with this token does not exist", 401));
  }

  // 4) Check if user changed password after the token was issued
  if (freshUser.changePasswordAfter(decodedToken.iat)) {
    // iat - issued at time
    return next(
      new AppError(
        "The user recently changed the password. Please login again",
        401
      )
    );
  }

  req.user = freshUser;
  next();
});
