const User = require("../models/user");

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

async function login(req, res) {
  const { email, password } = req.body;

  const query = User.where({ email: email });
  const user = await query
    .findOne(function (error, user) {
      if (error) throw error;
      if (user) {
        return user;
      }
    })
    .clone();

  res.json({
    user,
  });
  // if (!user) {
  //   throw Error("User not found");
  // }
  // if (user.email === email) {
  //   console.log(user.password);
  //   const token = jwt.sign({ user }, "secretKey", {
  //     expiresIn: "24h",
  //   });

  //   res.json({
  //     user,
  //     token,
  //     message: "user successfully logged in",
  //   });
  // } else {
  //   res.status(401).json({
  //     message: "Unauthenticated",
  //   });
  // }
}

module.exports = {
  createUser,
  login,
};
