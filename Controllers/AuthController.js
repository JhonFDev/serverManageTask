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
    const token = jwt.sign({ user: { id: user.id } }, process.env.SECRET, {
      expiresIn: "1h",
    });
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
      return res.status(400).json({ msg: "Usuario no registrado" });
    }

    // Compara la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    // Genera y envía el token JWT
    const token = jwt.sign({ user: { id: user.id } }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

const updateUser = async (req, res) => {
  try {
    const userid = req.params.id;
    const updateFields = req.body;

    // Verifica si el usuario existe
    let updateUser = await userModel.findByIdAndUpdate(
      userid,
      { $set: updateFields },
      { new: true }
    );

    if (!updateUser) {
      return res
        .status(400)
        .json({ msg: "Usuario a actualizar no fue encontrado" });
    } else {
      res
        .status(200)
        .send(
          `El usuario fue actualizado respuesta del servidor ${updateUser}`
        );
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

const eraseUser = async (req, res) => {
  try {
    const { username } = req.body;

    // Verifica si el usuario existe
    let deleteUser = await userModel.findOneAndDelete(username, { username });

    if (!deleteUser) {
      return res
        .status(400)
        .json({ msg: "Usuario a eliminar no fue encontrado" });
    } else {
      res
        .status(200)
        .send(`El usuario fue borrado respuesta del servidor ${deleteUser}`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  register,
  login,
  eraseUser,
  updateUser,
};
