const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();

const mainRouter = require("./router/router");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);

  process.exit(1);
});
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.CLUSTER_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database succesfully");
  });

// middleware specific to this router

app.use("/", express.static(path.join(__dirname, "../management-app/build")));

app.listen(PORT, () => {
  console.log("server is running on express server ");
});
