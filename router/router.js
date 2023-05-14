const express = require("express");
const path = require(`path`);
const sgMail = require("@sendgrid/mail");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  next();
});

router.get("/", (req, res) => {
  res.send("Hello from router.");
});

router.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/form.html"));
});

router.post("/submit", (req, res) => {
  const msg = {
    to: "me@aurmordesigns.net",
    from: "me@aurmordesigns.net",
    subject: req.body.subject,
    text: `message from: ${req.body.from}, ${req.body.message}`,
    html: `<div> <p>${req.body.from}</p>, <br/> <p>${req.body.message}</p></div>`,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log({
        response: response,
      });
      res.status(response[0].statusCode).send("Thank you for your message!");
    })
    .catch((error) => {
      console.error(error);
      res.status(error.code).send(error.ResponseError);
    });
});

module.exports = router;
