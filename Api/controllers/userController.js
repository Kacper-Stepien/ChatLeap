const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Post = require("./../models/postModel");
const Comment = require("./../models/commentModel");
const Like = require("./../models/likeModel");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // Only accept images
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}; // Create empty object
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().sort({ surname: 1 });
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

exports.getUsersByNameOrNick = catchAsync(async (req, res, next) => {
  const search = req.params.search;
  const users = await User.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { surname: { $regex: search, $options: "i" } },
      { nick: { $regex: search, $options: "i" } },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      users,
      length: users.length,
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
  //  Delete all posts
  await Post.deleteMany({ author: req.user.id });
  // Delete all comments
  await Comment.deleteMany({ author: req.user.id });
  // Delete all likes
  await Like.deleteMany({ author: req.user.id });
  // Delete user
  await User.findByIdAndDelete(req.user.id);
  return res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getPostsByUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const posts = await Post.find({ author: userId })
    .populate("author")
    .populate("comments")
    .populate("likes")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

exports.uploadPhoto = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const oldPhoto = user.photo;

  if (req.file) {
    user.photo = req.file.filename;
    await user.save({ validateBeforeSave: false });
    if (oldPhoto) {
      fs.unlink(`public/images/users/${oldPhoto}`, (err) => {
        if (err) {
          return next(new AppError("Error deleting old photo", 500));
        }
      });
    }
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
