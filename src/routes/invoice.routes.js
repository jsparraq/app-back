const express = require("express");
const { InvoiceController } = require("../controllers");
const { authMiddleware, authRoles } = require("../middlewares");
const roles = require("../shared/enums/roles");

const router = express.Router();

router
  .route("/invoice")
  .all([authMiddleware, authRoles(roles.all())])
  .post(InvoiceController.createInvoice)
  .get(InvoiceController.getInvoices);

router
  .route("/invoice/:invoiceId")
  .all([authMiddleware, authRoles([roles.ADMIN])])
  .delete(InvoiceController.deleteInvoice);

module.exports = router;
