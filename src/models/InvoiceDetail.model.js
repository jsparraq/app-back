const { DataTypes } = require("sequelize");
const { connection } = require("../config/db");
const Product = require("./Product.model");
const Invoice = require("./Invoice.model")

const InvoiceDetail = connection.define(
  "InvoiceDetail",
  {
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      unique: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

Product.belongsToMany(Invoice, { through: InvoiceDetail});
Invoice.belongsToMany(Product, { through: InvoiceDetail});


module.exports = InvoiceDetail;
