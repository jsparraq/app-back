const express = require("express");
const UserController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router
  .route("/user")
  .post(UserController.createUser)
  .get(verifyToken, UserController.getUsers);

router.route("/login").post(UserController.login);

module.exports = router;
