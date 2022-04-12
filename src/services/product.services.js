const Product = require("../models/Product.model");

const createProduct = (name, price, image) => {
  return Product.create({ name, price, image })
    .then((product) => {
      return { name: product.name, price: product.price };
    })
    .catch((err) => {
      throw Error(err.original.message);
    });
};

module.exports = {
  createProduct,
};
