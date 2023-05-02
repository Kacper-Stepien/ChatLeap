const express = require("express");
const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");
const commentController = require("./../controllers/commentController");
const likeController = require("./../controllers/likeController");

const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(authController.protect, postController.updatePost)
  .delete(authController.protect, postController.deletePost);

router
  .route("/:id/comments")
  .post(authController.protect, commentController.createComment)
  .get(authController.protect, postController.getPostComments);

router
  .route("/:id/likes")
  .post(authController.protect, likeController.toggleLike);

module.exports = router;
