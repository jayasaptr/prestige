import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 80;

app.use(cors());

app.use(express.json());

app.use("/api", require("./api"));
app.use("/storage", express.static("storage"));

app.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});
