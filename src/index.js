const express = require("express");

const connectDb = require("../config/db");
const getDataEndP = require("../scripts/getDataEndP");

// DATABASE CONFIG
connectDb();

const app = express();

// const parsedRecord =
app.get("/", (req, res) => {
  res.send("App Server Working.......");
});
app.get("/getData", getDataEndP);

app.listen(8000);

/* GET users listing. */
