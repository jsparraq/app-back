const express = require("express");
const UserRouter = require("./routes/user.routes");
const ProductRouter = require("./routes/product.routes");
const InvoiceRouter = require("./routes/invoice.routes");

const router = express.Router();

router.use(UserRouter);
router.use(ProductRouter);
router.use(InvoiceRouter);

module.exports = router;
