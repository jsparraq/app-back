const ProductServices = require("../services/product.services");
const { extractDataIfUnique } = require("../shared/utils/utils");

const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const image = req.files;

    if (!(name && price && image)) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required",
      });
    }
    const imageData = extractDataIfUnique(image);
    const product = await ProductServices.createProduct(name, price, imageData);
    res.status(201).json({
      ok: true,
      code: 201,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    console.log("asdf");
    res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports = {
  createProduct,
};
