const ProductServices = require("../services/product.services");
const { extractDataIfUnique } = require("../shared/utils/utils");

const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file;

    if (!(name && price && image)) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required",
      });
    }
    
    const product = await ProductServices.createProduct(name, price, image);
    
    res.status(201).json({
      ok: true,
      code: 201,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({ ok: false, error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    if (!(offset && limit)) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required",
      });
    }

    const products = await ProductServices.getProducts(offset, limit);
    res.status(200).json({
      ok: true,
      code: 201,
      message: "Product created successfully",
      products,
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
};
