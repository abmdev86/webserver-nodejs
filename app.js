const path = require("path");
const express = require("express");
const app = express();
const mainRouter = require('./router/router');

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);

  process.exit(1);
});

// middleware specific to this router

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/", mainRouter);



app.listen(3000, () => {
  console.log("server is running on express server ");
});
