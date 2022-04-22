const express = require("express");
const { UserController } = require("../controllers");
const { authMiddleware, authRoles } = require("../middlewares");
const roles = require("../shared/enums/roles");

const router = express.Router();

router
  .route("/user")
  .post(authMiddleware, authRoles([roles.EMPLOYEE]), UserController.createEmployee)
  .get(authMiddleware, authRoles([roles.ADMIN]), UserController.getUsers);

router
  .route("/user/:userId")
  .all([authMiddleware, authRoles([roles.ADMIN])])
  .delete(UserController.deleteEmployee);

router.route("/login").post(UserController.login);

module.exports = router;
