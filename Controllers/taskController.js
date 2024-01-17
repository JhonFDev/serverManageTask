// controllers/taskController.js
const Task = require("../models/taskModel");

// Implementa funciones CRUD

//crear tarea
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Crea una nueva tarea
    const task = new Task({ title, description });

    // Guarda la tarea en la base de datos
    await task.save();

    res
      .status(201)
      .json(task)
      .send(`Tarea "${task.name}" creada exitosamente`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

const getAllTasks = async (req, res) => {
  try {
    // Obtiene todas las tareas desde la base de datos
    const tasks = await Task.find();

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Obtiene una tarea por su ID desde la base de datos
    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ msg: `La tarea con id ${id} no fue encontrada` });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updateFields = req.body;

    // Actualiza la tarea por su ID
    const updateTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updateFields},
      { new: true }
    );

    if (updateTask) {
      res.status(200).send(updateTask);
    }else {
      return res.status(404).json({ msg: `la tarea con id ${id} no fue encontrada` });
    }

    } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

const deleteTask = async (req, res) => {
  try {
    const {title} = req.body;

    // Elimina la tarea por su ID
    const deleteTask = await Task.findOneAndDelete(title, {title});

    if (deleteTask) {
      res
        .status(200)
        .send(
          `la tarea con id ${id} fue borrada, respuesta del servidor ${deleteTask}`
        );
    }else{
      res.status(404).json({ msg: `la tarea con ${id} no fue borrada` });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
