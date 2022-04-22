const { DataTypes } = require("sequelize");
const { connection } = require("../config/db");
const Product = require("./Product.model");
const Invoice = require("./Invoice.model");

const InvoiceDetail = connection.define(
  "InvoiceDetail",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Product.belongsToMany(Invoice, {
  through: InvoiceDetail,
  onDelete: "NO ACTION",
});
Invoice.belongsToMany(Product, {
  through: InvoiceDetail,
});

module.exports = InvoiceDetail;
