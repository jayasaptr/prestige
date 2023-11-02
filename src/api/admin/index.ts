import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();
const app = express();

app.use(express.json());

// login admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.password) {
    return res.status(404).json({
      message: "Password not set",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  const image = process.env.PUBLIC_IMAGE;

  if (isPasswordValid) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const secret = process.env.JWT_SECRET!;

    const expiresIn = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

    return res.json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } else {
    return res.status(403).json({
      message: "Wrong password",
    });
  }
});

module.exports = router;
