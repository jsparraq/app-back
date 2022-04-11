const { Sequelize } = require("sequelize");
const envVars = require('./envVars')

const sequelize = new Sequelize(
  envVars.DB_NAME,
  envVars.USER_DB,
  envVars.PASS_DB,
  {
    host: envVars.HOST_DB,
    port: envVars.PORT_DB,
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize
