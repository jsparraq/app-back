const { InvoiceServices } = require("../services");

const createInvoice = async (req, res) => {
  try {
    const { total, tip, products } = req.body;

    if (!(total && tip && products)) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required",
      });
    }

    const invoice = await InvoiceServices.createInvoice(req.body);

    res.status(201).json({
      ok: true,
      code: 201,
      message: "Invoice created successfully",
      invoice,
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

const getInvoices = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    if (!(offset && limit)) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required",
      });
    }

    const invoices = await InvoiceServices.getInvoices(offset, limit);
    res.status(200).json({
      ok: true,
      code: 201,
      message: "Product created successfully",
      invoices,
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;

    const invoice = await InvoiceServices.deleteInvoice(invoiceId)

    res.status(200).json({
      ok: true,
      code: 200,
      message: "",
      invoice,
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  deleteInvoice,
};
