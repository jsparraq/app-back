const express = require("express");
const { image } = require("../config/cloudinary");
const ProductController = require("../controllers/product.controller");
const { authMiddleware, fileMiddleware } = require("../middlewares");

const router = express.Router();

router
  .route("/product")
  .all(authMiddleware, fileMiddleware.single("image"))
  .post(ProductController.createProduct)
  .get(ProductController.getProducts);

module.exports = router;
