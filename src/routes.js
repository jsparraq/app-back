const express = require("express");
const UserRouter = require("./routes/user.routes");

const router = express.Router();

router.use(UserRouter);

module.exports = router;
