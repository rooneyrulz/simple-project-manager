const { verifyToken } = require("../config/config");

module.exports = (req, res, next) => {
  const token = req.get("Authorization")
    ? req.get("Authorization").split(" ")[1]
    : null;

  if (!token) {
    req.isAuth = false;
    req.org = null;
    return next();
  }

  let decodedToken;

  try {
    decodedToken = verifyToken(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    req.isAuth = false;
    req.org = null;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    req.org = null;
    return next();
  }

  console.log(decodedToken);
  req.isAuth = true;
  req.org = decodedToken;
  next();
};
