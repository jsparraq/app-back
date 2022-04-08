require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routes");

const app = express();

app
  .use(
    bodyParser.json({
      limit: "50mb",
    })
  )
  .use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  )
  .use(cors());

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to ${PORT}`);
});

module.exports = app;
