// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require("dotenv").config();


module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET); // Reemplaza 'secret' con tu clave secreta
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

