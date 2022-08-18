const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateHash = async (rounds) => await bcrypt.genSalt(rounds);

const bcryptPassword = async (password) =>
  await bcrypt
    .hash(password, await generateHash(12))
    .catch((err) => console.error(err));

const comparePassword = async (password1, password2) =>
  await bcrypt.compare(password1, password2).catch((err) => console.error(err));

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);

module.exports = {
  bcryptPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
