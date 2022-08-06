const SHA256 = require("crypto-js/sha256");
const User = require("../models/user");

function setPassword(value) {
  return SHA256(value);
}

module.exports = {
  setPassword,
};
