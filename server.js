const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
const conectDb = require("./utils/dbConection")
const tasksRouter = require("./Routes/tasks");
const authRouter = require("./Routes/auth");

// Implementa los routers en las rutas correspondientes
app.use("/tasks", conectDb, tasksRouter);
app.use("/auth", conectDb, authRouter);

// Resto de la configuración y rutas del servidor

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${port}`);
});
