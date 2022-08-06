const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);

  process.exit(1);
});
mongoose
  .connect(process.env.CLUSTER_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database succesfully");
  });

// middleware specific to this router
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "../management-app/build")));
app.use("/users", userRouter);
app.listen(PORT, () => {
  console.log("server is running on express server ");
});
