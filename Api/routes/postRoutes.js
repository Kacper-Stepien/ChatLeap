const express = require("express");
const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");
const commentController = require("./../controllers/commentController");

const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router
  .route("/:id")
  .patch(authController.protect, postController.updatePost)
  .delete(authController.protect, postController.deletePost);

router
  .route("/:id/comments")
  .get(authController.protect, postController.getPostComments);

module.exports = router;
