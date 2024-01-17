/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  console.log(user);
  return jwt.sign(user, process.env.SECRET, { expiresIn: "1h" });
}
function validateToken(req, res, next) {
  const accesToken = req.headers["authorization"];
  if (!accesToken) {
    res.json("Acceso denegado, se requiere un token");
  } else {
    jwt.verify(accesToken, process.env.SECRET, (err) => {
      if (err) {
        res.send("Acceso denegado, token expirado o incorrecto");
        console.log(err)
      } else {
        next();
      }
    });
  }
}

module.exports = { generateToken, validateToken };
