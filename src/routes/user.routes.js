const express = require("express");
const UserController = require("../controllers/user.controller");
const { authMiddleware, authRoles } = require("../middlewares");
const roles = require("../shared/enums/roles")

const router = express.Router();

router
  .route("/user")
  .post(authMiddleware, authRoles([roles.ADMIN]), UserController.createEmployee)
  .get(authMiddleware, authRoles([roles.ADMIN]), UserController.getUsers);

router.route("/login").post(UserController.login);

module.exports = router;
