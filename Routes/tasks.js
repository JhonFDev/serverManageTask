const express = require("express");

const tasksRouter = express();

const taskModel = require("../models/taskModel");

tasksRouter
.get("/", async (req, res) => {
const tasks = await taskModel.find();
res.json(tasks);
})

.get("/:id", async (req, res) => {
const {id} = req.params;
const task = await taskModel.findById(id);
if (task) {
res.status(200).send(task);
} else {
res.status(404).send("La tarea con id $(id) no fue encontrada");
}
})

.post("/", (req, res) => {
const reqTask = req.body;
const newTask= new taskModel(reqTask);
newTask.save();
res.status(200).send(`Tarea "${newTask.name}" creada exitosamente`);
})

.put ("/id", async (req, res) => {
    const { id } = req.params
    const updateFields = req.body;
    const updateTask = await taskModel.findByAndUpdate(
        id,
        { $set: updateFields },
        { new: true}
    );
    if (updateTask) {
        res.status(200).send(updateTask);
    } else {
        res.status(404).send(`la tarea con id ${id} no fue encontrada`);
    }
})
.delete("/:id", async(req, res) =>{
    const { id } = req.params;
    const deleteTask = await taskModel.findByIdAndDelete(id);
    if (deleteTask) {
        res
            .status(200)
            .send(
                `la tarea con id ${id} fue borrada, respuesta del servidor ${deleteTask}`
            );
    }else {
        res.status(404).send(`la tarea con ${id} no fue borrada`)
    }
});

module.exports = tasksRouter;