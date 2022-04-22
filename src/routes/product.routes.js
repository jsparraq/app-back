const express = require("express");
const { ProductController } = require("../controllers");
const { authMiddleware, fileMiddleware, authRoles } = require("../middlewares");
const roles = require("../shared/enums/roles");

const router = express.Router();

router
  .route("/product")
  .all([authMiddleware, fileMiddleware.single("image")])
  .post(authRoles([roles.ADMIN]), ProductController.createProduct)
  .get(authRoles(roles.all()), ProductController.getProducts);

router
  .route("/product/:productId")
  .all([authMiddleware, authRoles([roles.ADMIN])])
  .delete(ProductController.deleteProduct);

module.exports = router;
