require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Product, User, Invoice, InvoiceDetail } = require("./models");
const router = require("./routes");

const { createUser } = require("./services/user.services");
const { ADMIN_EMAIL } = require("./config/envVars");

const roles = require("./shared/enums/roles");

const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();

app
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .use(cors());

app.use(router);

app.get("/", async (_, res) => {
  res.status(200).json({
    message: "Backend up",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  /* await Promise.all([
    User.sync({ alter: true }),
    Product.sync({ alter: true }),
    Invoice.sync({ alter: true }),
  ]).then(async () => {
    await InvoiceDetail.sync({ alter: true })
  }).catch((err) => {
    console.log(err.original);
  }); */

  console.log(`App listening to ${PORT}`);
  const adminUser = {
    name: "Admin User",
    password: Math.random().toString(36).slice(-8),
    email: ADMIN_EMAIL,
  };
  await createUser(
    adminUser.name,
    adminUser.password,
    adminUser.email,
    roles.ADMIN
  )
    .then((user) => { 
      console.log(`Admin user: ${user.email} - ${adminUser.password}`);
    })
    .catch(() => {
      console.log("The admin user could not be created");
    });
});

app.use(errorHandler);

module.exports = app;
