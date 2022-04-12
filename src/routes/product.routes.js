const express = require("express")
const ProductController = require("../controllers/product.controller")
const { authMiddleware, fileMiddleware } = require("../middlewares");


const router = express.Router()

router.route("/product").post(authMiddleware, fileMiddleware, ProductController.createProduct)

module.exports = router