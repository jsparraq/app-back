const Product = require("../models/Product.model");
const cloudinary = require("../config/cloudinary");
const { ValidationError } = require("sequelize");

const createProduct = async (name, price, image) => {
  const cloudinary_image = await cloudinary.uploader.upload(image.path, {
    folder: "/menu/platos",
  });
  return Product.create({ name, price, cloudinary_id: cloudinary_image.public_id })
    .then((product) => {
      return { name: product.name, price: product.price };
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        throw Error(err.message);
      }
      throw Error(err.original.message);
    });
};

const getProducts = (offset, limit) => {
  return Product.findAll({
    order: [["createdAt", "DESC"]],
    offset,
    limit,
  });
};

module.exports = {
  createProduct,
  getProducts,
};
