const Post = require("./../models/postModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Comment = require("./../models/commentModel");
const Like = require("./../models/likeModel");

const postExists = async (postId) => {
  return Post.exists({ _id: postId });
};

const postBelongsToUser = async (postId, userId) => {
  return Post.exists({ _id: postId, author: userId });
};

exports.createPost = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const author = req.user.id;

  const post = await Post.create({ text, author });

  res.status(201).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const newText = req.body.text;
  const author = req.user.id;

  if (!(await postExists(postId))) {
    return next(new AppError("Post not found", 400));
  }

  if (!(await postBelongsToUser(postId, author))) {
    return next(new AppError("You are not allowed to modify this post", 400));
  }

  const post = await Post.findByIdAndUpdate(
    {
      _id: postId,
    },
    {
      text: newText,
      modifiedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const author = req.user.id;

  if (!(await postExists(postId))) {
    return next(new AppError("Post not found", 400));
  }
  if (!(await postBelongsToUser(postId, author))) {
    return next(new AppError("You are not allowed to delete this post", 400));
  }

  const post = await Post.findOneAndDelete({ _id: postId, author });

  // Delete all post's comments
  await Comment.deleteMany({ post: postId });

  // Delete all post's likes
  await Like.deleteMany({ post: postId });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({}).populate("author");

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  if (!(await postExists(postId))) {
    return next(new AppError("Post not found", 400));
  }
  const post = await Post.findById(req.params.id).populate("author");

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
