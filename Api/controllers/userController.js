const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Post = require("./../models/postModel");
const Comment = require("./../models/commentModel");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}; // Create empty object
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
      length: users.length,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUserByNick = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ nick: req.params.nick });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "The password cannot be changed by this method. Use /updateMyPassword",
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, "name", "surname", "email", "nick");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true, // Return updated document
    runValidators: true, // Run validators on update
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);
  return res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getPostsByUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const posts = await Post.find({ author: userId })
    .populate("author")
    .populate("comments");

  console.log(posts);
  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});
