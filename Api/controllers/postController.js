const Post = require("./../models/postModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Comment = require("./../models/commentModel");
const Like = require("./../models/likeModel");
const User = require("./../models/userModel");
const CustomQuery = require("./../utils/customQuery");

const postExists = async (postId) => {
  return Post.exists({ _id: postId });
};

const postBelongsToUser = async (postId, userId) => {
  return Post.exists({ _id: postId, author: userId });
};

exports.createPost = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const author = req.user.id;
  const user = await User.findById(author);
  const date = Date.now();

  let post = await Post.create({
    text,
    author,
    createdAt: date,
    modifiedAt: date,
  });
  post.author = user;

  // add post to user
  user.posts.push(post);
  await user.save();

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
    return next(new AppError("You are not allowed to modify this post", 403));
  }

  let post = await Post.findByIdAndUpdate(
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

  post = await Post.findById(postId).populate("author");

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
    return next(new AppError("You are not allowed to delete this post", 403));
  }

  const post = await Post.findOneAndDelete({ _id: postId, author });

  // Delete all post's comments
  await Comment.deleteMany({ post: postId });

  // Delete all post's likes
  await Like.deleteMany({ post: postId });

  // Delete post from user
  await User.findByIdAndUpdate(
    author,
    { $pull: { posts: postId } },
    { new: true }
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const features = new CustomQuery(
    Post.find().populate("author"),
    req.query
  ).paginate();
  const posts = await features.query
    .populate("likes")
    .populate("comments")
    .sort({ createdAt: -1 });
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
  const post = await Post.findById(req.params.id)
    .populate("author")
    .populate("comments");

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.getPostComments = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  if (!(await postExists(postId))) {
    return next(new AppError("Post not found", 400));
  }

  const comments = await Comment.find({ post: postId }).populate("author");

  res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});
