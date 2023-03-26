const Post = require("./../models/postModel");
const Comment = require("./../models/commentModel");
const User = require("./../models/userModel");
const Like = require("./../models/likeModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { postExists } = require("./../utils/postExists");
const { commentExists } = require("./../utils/commentExists");
const { commentBelongsToUser } = require("./../utils/commentBelongsToUser");

exports.createComment = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const postId = req.params.id;
  const authorId = req.user.id;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError("Post not found", 400));
  }

  const comment = await Comment.create({
    text,
    author: authorId,
    post: postId,
  });

  // add comment to post

  post.comments.push(comment);
  await post.save();

  res.status(201).json({
    status: "success",
    data: {
      comment,
    },
  });
});

exports.getCommentById = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;

  if (!(await commentExists(commentId))) {
    return next(new AppError("Comment not found", 400));
  }

  const comment = await Comment.findById(commentId).populate("author");
  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;
  const newText = req.body.text;
  const authorId = req.user.id;

  // Check if comment exists
  if (!(await commentExists(commentId))) {
    return next(new AppError("Comment not found", 400));
  }

  // Check if comment belongs to user
  if (!(await commentBelongsToUser(commentId, authorId))) {
    return next(
      new AppError("You are not allowed to modify this comment", 403)
    );
  }

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { text: newText, modifiedAt: Date.now() },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;
  const authorId = req.user.id;

  // Check if comment exists
  if (!(await commentExists(commentId))) {
    return next(new AppError("Comment not found", 400));
  }

  // Check if comment belongs to user
  if (!(await commentBelongsToUser(commentId, authorId))) {
    return next(
      new AppError("You are not allowed to delete this comment", 403)
    );
  }

  const deletetComment = await Comment.findByIdAndDelete(commentId);
  // remove comment from post
  await Post.findByIdAndUpdate(
    deletetComment.post,
    { $pull: { comments: commentId } },
    { new: true }
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
});
