// routes/tasks.js
const express = require('express');
const routerTask = express.Router();
const taskcontroller = require('../Controllers/taskController');
const authMiddleware = require('../middlewares/jwtAuthMiddleware');

// Rutas CRUD
routerTask.post('/', authMiddleware, taskcontroller.createTask);
routerTask.get('/', authMiddleware, taskcontroller.getAllTasks);
routerTask.get('/:id', authMiddleware, taskcontroller.getTaskById);
routerTask.put('/:id', authMiddleware, taskcontroller.updateTask);
routerTask.delete('/:id', authMiddleware, taskcontroller.deleteTask);

module.exports = routerTask;