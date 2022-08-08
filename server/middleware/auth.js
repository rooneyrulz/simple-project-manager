const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.get('Authorization')
      ? req.get('Authorization').split(' ')[1]
      : null;
  
    if (!token) {
      req.isAuth = false;
      return next();
    }
  
    let decodedToken;
  
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      req.isAuth = false;
      return next();
    }
  
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }
  
    req.isAuth = true;
    req.org = decodedToken;
    next();
  };