require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Product, User } = require("./models")
const router = require("./routes");

const app = express();

app
  .use(
    bodyParser.json()
  )
  .use(
    bodyParser.urlencoded({
      extended: true
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

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  User.sync({ alter: true });
  Product.sync({ alter: true });
  console.log(`App listening to ${PORT}`);
});

module.exports = app;
