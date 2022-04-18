const { DataTypes } = require("sequelize");
const { connection } = require("../config/db");

const Invoice = connection.define(
  "Invoice",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      unique: true,
    },
    tip: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: connection.fn("NOW"),
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: connection.fn("NOW"),
      field: "updated_at",
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Invoice;
