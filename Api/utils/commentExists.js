const Comment = require("./../models/commentModel");

exports.commentExists = async (commentId) => {
  console.log(`commentExists: ${commentId}`);
  return Comment.exists({ _id: commentId });
};
