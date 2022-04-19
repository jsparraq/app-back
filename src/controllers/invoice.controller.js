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

module.exports = {
  createInvoice,
};
