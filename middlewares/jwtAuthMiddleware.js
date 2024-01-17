// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require("dotenv").config();


module.exports = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado, se requiere un token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET); // Reemplaza 'secret' con tu clave secreta
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Acceso denegado, token expirado o incorrecto' });
  }
};

