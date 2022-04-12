const express = require("express");
const UserRouter = require("./routes/user.routes");
const ProductRouter = require("./routes/product.routes")

const router = express.Router();

router.use(UserRouter);
router.use(ProductRouter);


module.exports = router;
