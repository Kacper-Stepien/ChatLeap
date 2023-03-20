const Comment = require("./../models/commentModel");

exports.commentBelongsToUser = async (commentId, userId) => {
  return Comment.exists({ _id: commentId, author: userId });
};
