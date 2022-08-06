const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const { email, password } = req.body;

  const user = await User.create({
    email,
    password,
  });

  res.json({
    user,
    message: "User Created Successfully",
  });
}
