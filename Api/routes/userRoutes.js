const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);

router.post("/login", authController.login);

router.get("/", authController.protect, userController.getAllUsers);

router.get("/:id", authController.protect, userController.getUser);

router.get("/:id/posts", authController.protect, userController.getPostsByUser);

router.get("/nick/:nick", authController.protect, userController.getUserByNick);

router.patch("/updateMe", authController.protect, userController.updateMe);

router.patch(
  "/photo",
  authController.protect,
  userController.uploadUserPhoto,
  userController.uploadPhoto
);

router.delete("/deleteMe", authController.protect, userController.deleteMe);

module.exports = router;
