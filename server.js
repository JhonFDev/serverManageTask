const express = require("express");
const app = express();
const port = 5000;

const conectDb = require("./utils/dbConection");
const userRouter = require("./Routes/users");
const tasksRouter = require("./Routes/tasks");
const authRouter = require("./Routes/auth");

const cors = require("cors");
const {validateToken} = require("./utils/jwt");

app.use(cors());
app.use(express.json());

// Implementa los routers en las rutas correspondientes
app.use("/users",  conectDb, userRouter);
app.use("/tasks",  conectDb, tasksRouter);
app.use("/auth", conectDb, authRouter);

// Resto de la configuración y rutas del servidor

const server = app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});