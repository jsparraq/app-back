const express = require('express')
const UserController = require('./controllers/user.controller')

const router = express.Router();

router
  .route("/user")
  .post(UserController.createUser)
  .get(UserController.getUsers);

module.exports = router