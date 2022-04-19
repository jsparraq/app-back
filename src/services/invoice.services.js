const { Invoice } = require("../models");
const ProductServices = require("./product.services");

const createInvoice = async (invoice) => {
  const invoiceInstance = await Invoice.create({
    total: invoice.total,
    tip: invoice.tip,
  });

  for (const product of invoice.products) {
    const productInstance = await ProductServices.getProduct(product.name);
    invoiceInstance.addProduct(productInstance, {
      through: { quantity: product.quantity },
    });
  }

  return invoiceInstance;
};

module.exports = {
  createInvoice,
};
