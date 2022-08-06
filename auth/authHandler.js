const SHA256 = require("crypto-js/sha256");

function setPassword(value) {
  return SHA256(value);
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw Error("User not found");
  }
  if (user.password === password) {
    console.log(user.password);
    const token = jwt.sign({ user }, "secretKey", {
      expiresIn: "24h",
    });

    res.json({
      user,
      token,
      message: "user successfully logged in",
    });
  } else {
    res.status(401).json({
      message: "Unauthenticated",
    });
  }
}

module.exports = {
  setPassword,
  login,
};
