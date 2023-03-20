const express = require("express");
const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");
const commentController = require("./../controllers/commentController");

const router = express.Router();

router.post("/", authController.protect, commentController.createComment);

router
  .route("/:id")
  .get(authController.protect, commentController.getCommentById)
  .patch(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

// router
//   .route("/:id/comment")
//   .post(authController.protect, commentController.createComment)
//   .patch(authController.protect, commentController.updateComment);

router;

module.exports = router;
