require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Product, User } = require("./models");
const router = require("./routes");

const { createUser } = require("./services/user.services");
const EmailService = require("./shared/emails/emails.service");
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
  await User.sync({ alter: true }).catch((err) => {
    console.log(err);
  });
  await Product.sync({ alter: true }).catch((err) => {
    console.log(err);
  });

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
      // EmailService.send(
      //   adminUser.email,
      //   `The admin user has been created and the credentials are \n Email: ${adminUser.email} \n Password: ${adminUser.password}`
      // );
      console.log(`Admin user: ${user.email} - ${adminUser.password}`);
    })
    .catch((err) => {
      console.log("The admin user could not be created");
      console.log(err);
    });
});

app.use(errorHandler);

module.exports = app;
