const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const bcryptPassword = async (password, hash) =>
  await bcrypt.hash(password, hash).catch((err) => console.error(err));

const comparePassword = async (password1, password2) =>
  await bcrypt.compare(password1, password2).catch((err) => console.error(err));

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_SECRET_EXPIRATION_IN_SECONDS,
  });

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);

module.exports = {
  bcryptPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
