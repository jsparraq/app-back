const express = require("express");
const { UserRouter, ProductRouter } = require("./routes");

const router = express.Router();

router.use(UserRouter);
router.use(ProductRouter);

module.exports = router;
