import express, { NextFunction, Request, Response } from "express";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api", require("./api"));
app.use("/storage", express.static("storage"));

app.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});
