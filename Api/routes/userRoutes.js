const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);

router.post("/login", authController.login);

router.get("/", userController.getAllUsers);

router.get("/:id", authController.protect, userController.getUser);

router.get("/nick/:nick", userController.getUserByNick);

router;

module.exports = router.patch("/updateMe/:id", userController.updateMe);
