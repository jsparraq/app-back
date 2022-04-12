const express = require("express");
const UserController = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router
  .route("/user")
  .post(UserController.createUser)
  .get(authMiddleware, UserController.getUsers);

router.route("/login").post(UserController.login);

module.exports = router;
