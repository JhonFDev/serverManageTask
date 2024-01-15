const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
