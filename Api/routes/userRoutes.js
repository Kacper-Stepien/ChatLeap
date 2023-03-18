const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signUp);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.get("/nick/:nick", userController.getUserByNick);

router;

module.exports = router.patch("/updateMe/:id", userController.updateMe);
