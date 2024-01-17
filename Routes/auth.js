const express = require("express");
const authRouter = express();
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

authRouter.post("/", async (req, res) => {
  console.log("Entro una peticion de autorización");
  console.log(req.body);
  const { username, password } = req.body;
  const user = await userModel.findOne({ username, password });
  if (!user) {
    res.status(401).json(" Usuario no registrado");
  } else {
    const accesToken = generateToken({ userName: username, passWord: password });
    res.header("autorization", accesToken).json({
      mensaje: "Usuario autenticado",
      token: accesToken,
    });
  }
});


module.exports = authRouter
