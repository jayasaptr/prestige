import { PrismaClient } from "@prisma/client";
import express, { Router } from "express";
import Joi from "joi";
import fileUpload from "../../../utils/fileUpload";

const prisma = new PrismaClient();
const router = Router();
const app = express();

app.use(express.json());

// GET /api/destination
router.get("/", async (req, res) => {
  const destinations = await prisma.destination.findMany({});
  res.json(destinations);
});

// GET /api/destination/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const destination = await prisma.destination.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(destination);
});

module.exports = router;
