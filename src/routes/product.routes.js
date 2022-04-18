const express = require("express");
const { ProductController } = require("../controllers");
const { authMiddleware, fileMiddleware } = require("../middlewares");

const router = express.Router();

router
  .route("/product")
  .all(authMiddleware, fileMiddleware.single("image"))
  .post(ProductController.createProduct)
  .get(ProductController.getProducts);

module.exports = router;
