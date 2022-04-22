const { Invoice, Product, InvoiceDetail } = require("../models");
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

const getInvoices = (offset, limit) => {
  // TODO: Validate if it exist's invoices
  return Invoice.findAll({
    order: [["createdAt", "DESC"]],
    offset,
    limit,
    include: Product,
  }).then((invoicesDB) => {
    const invoices = [];

    for (const invoiceDB of invoicesDB) {
      const invoice = {
        total: invoiceDB.total,
        tip: invoiceDB.tip,
        Products: [],
        createdAt: invoiceDB.createdAt,
        id: invoiceDB.id
      };

      for (const productDB of invoiceDB.Products) {
        const product = {
          name: productDB.name,
          price: productDB.price,
          quantity: productDB.InvoiceDetail.quantity,
        };
        invoice.Products.push(product);
      }
      invoices.push(invoice);
    }

    return invoices;
  });
};

const deleteInvoice = async (id) => {
  await InvoiceDetail.destroy({
    where: {
      InvoiceId: id,
    },
  });

  return Invoice.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  createInvoice,
  getInvoices,
  deleteInvoice,
};
