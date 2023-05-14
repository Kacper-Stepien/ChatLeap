const Comment = require("./../models/commentModel");

exports.commentExists = async (commentId) => {
  return Comment.exists({ _id: commentId });
};
