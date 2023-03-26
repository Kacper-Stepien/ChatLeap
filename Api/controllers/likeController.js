const Post = require("./../models/postModel");
const Like = require("./../models/likeModel");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const { postExists } = require("./../utils/postExists");

exports.createLike = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  if (!(await postExists(postId))) {
    return next(new AppError("Post not found", 400));
  }

  // Check if user has already liked the post
  if (await Like.exists({ post: postId, author: userId })) {
    return next(new AppError("You have already liked this post", 400));
  }

  const like = await Like.create({ author: userId, post: postId });

  // Add like to post
  const post = await Post.findById(postId);
  post.likes.push(like);
  await post.save();

  res.status(201).json({
    status: "success",
    data: {
      like,
    },
  });
});

exports.deleteLike = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  if (!(await postExists(postId))) {
    return next(new AppError("Post not found", 400));
  }

  // Check if user has already liked the post
  const like = await Like.findOne({ post: postId, author: userId });
  if (!like) {
    return next(new AppError("You have not liked this post", 400));
  }

  await Like.deleteOne({ post: postId, author: userId });
  console.log(like);

  // Remove like from post
  await Post.findByIdAndUpdate(
    postId,
    { $pull: { likes: like._id } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      like,
    },
  });
});