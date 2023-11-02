import express, { Router } from "express";
const router = Router();
const app = express();

app.use(express.json());

router.use("/auth", require("./auth"));

router.use("/admin", require("./admin"));

router.use("/customer", require("./customer"));

router.use("/driver", require("./driver"));

router.use("/destination", require("./destination"));

module.exports = router;
