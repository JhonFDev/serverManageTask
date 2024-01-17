const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica si el usuario ya existe
    let user = await userModel.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Crea un nuevo usuario
    user = new userModel({ username, password });

    // Hashea la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guarda el usuario en la base de datos
    await user.save();

    // Genera y envía el token JWT
    const token = jwt.sign({ user: { id: user.id } }, process.env.SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica si el usuario existe
    let user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    // Compara la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    // Genera y envía el token JWT
    const token = jwt.sign({ user: { id: user.id } }, process.env.SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  register,
  login,
};
