const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
const tasksRouter = require("./Routes/tasks");
const authRouter = require("./Routes/auth");

// Implementa los routers en las rutas correspondientes
app.use("/tasks", tasksRouter);
app.use("/auth", authRouter);

// Resto de la configuración y rutas del servidor

const server = app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${port}`);
});
