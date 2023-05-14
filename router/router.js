const express = require("express");
const path = require(`path`);
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  res.send("Hello from router.");
});

router.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/form.html"));
});

router.post("/submit", (req, res) => {
  console.log({
    from: req.body.from,
    name: req.body.name,
    message: req.body.message,
  });
  res.send("Thank you for your message!");
});

module.exports = router;
