const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Users = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
  },
  {
    tableName: "users",
    modelName: "User",
    underscored: true,
  }
);

module.exports = Users;
