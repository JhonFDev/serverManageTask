// routes/auth.js
const express = require('express');
const routerAuth = express.Router();
const authController = require('../Controllers/AuthController');

// Rutas de autenticación
routerAuth.post('/register', authController.register);
routerAuth.post('/login', authController.login);
routerAuth.put('/:id', authController.updateUser);
routerAuth.delete('/:id', authController.deleteuser);

module.exports = routerAuth;
