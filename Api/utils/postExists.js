const Post = require("./../models/postModel");

exports.postExists = async (postId) => {
  return Post.exists({ _id: postId });
};
