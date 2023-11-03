import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt, { JwtPayload } from "jsonwebtoken";
import { google } from "googleapis";
import fileUpload from "../../../utils/fileUpload";
import Joi from "joi";

const prisma = new PrismaClient();
const router = Router();

//Register
router.post(
  "/register",
  fileUpload("./storage/customers/"),
  async (req, res) => {
    // cek validasi input firstname, lastname, email, password
    const schema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { firstname, lastname, email, password } = req.body;

    // cek apakah email sudah terdaftar
    const user = await prisma.customers.findUnique({
      where: {
        email_customer: email,
      },
    });

    if (user) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const photo = `storage/customers/${req.file?.filename}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.customers.create({
      data: {
        first_name: firstname,
        last_name: lastname,
        email_customer: email,
        profile_picture: photo,
        password_customer: hashedPassword,
        status: "Waiting Approved",
      },
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info.sanjau@gmail.com",
        pass: process.env.PW_GOOGLE_MAIL,
      },
    });

    var mailOptions = {
      from: "info.sanjau@gmail.com",
      to: email,
      subject: "Verify your email",
      text: "Verifikasi disini",
      html: `<p>Click <a href="${process.env.PUBLIC_IMAGE}/api/auth/verify/${email}">here</a> to verify your e</p>`,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          message: `This extra step is required to keep your account safe. We'll send a verification to your email ending in : ${email}. Please check carefully in your inbox, spam or promotion.`,
        });
      }
    });
  }
);

//verifikasi email
router.get("/verify/:email", async (req, res) => {
  const { email } = req.params;

  const user = await prisma.customers.findUnique({
    where: {
      email_customer: email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  await prisma.customers.update({
    where: {
      email_customer: email,
    },
    data: {
      status: "Approved",
    },
  });

  const image = process.env.PUBLIC_IMAGE;

  const secret = process.env.JWT_SECRET!;

  const expiresIn = 60 * 60 * 1;

  const payload = {
    id: user.id,
    firstname: user.first_name,
    lastname: user.last_name,
    email: user.email_customer,
    photo: `${image}/${user.profile_picture}`,
    isVerified: user.status,
  };

  const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

  return res.redirect(
    `https://fe-prestige.zenmultimediacorp.com/?token=${token}`
  );
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.customers.findUnique({
    where: {
      email_customer: email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.password_customer) {
    return res.status(404).json({
      message: "Password not set",
    });
  }

  if (user.status === "Waiting Approved") {
    return res.status(403).json({
      message: "Please verify your email first",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password_customer
  );

  const image = process.env.PUBLIC_IMAGE;

  if (isPasswordValid) {
    const payload = {
      id: user.id,
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email_customer,
      photo: `${image}/${user.profile_picture}`,
      isVerified: user.status,
    };

    const secret = process.env.JWT_SECRET!;

    const expiresIn = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

    return res.json({
      data: {
        id: user.id,
        profile_picture: `${image}/${user.profile_picture}`,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        email_customer: user.email_customer,
        password_customer: user.password_customer,
        emergency_contact: user.emergency_contact,
        official_identify: user.official_identify,
        phone_number: user.phone_number,
        country_customer: user.country_customer,
        address: user.address,
        driver_license_number: user.driver_license_number,
        expiration_date: user.expiration_date,
        date_of_birth: user.date_of_birth,
        status: user.status,
      },
      token: token,
    });
  } else {
    return res.status(403).json({
      message: "Wrong password",
    });
  }
});

//  GOOGLE

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/api/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

// GOOGLE Login
router.get("/google", (req, res) => {
  res.redirect(authorizationUrl);
});

// GOOGLE callback login
router.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code as string);

  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const { data } = await oauth2.userinfo.get();

  if (!data.email || !data.name) {
    return res.json({
      data: data,
    });
  }

  let user = await prisma.customers.findUnique({
    where: {
      email_customer: data.email,
    },
  });

  if (!user) {
    user = await prisma.customers.create({
      data: {
        first_name: data.given_name || data.name,
        last_name: data.family_name || "",
        profile_picture: data.picture || "",
        email_customer: data.email,
        password_customer: "",
        status: "Approved",
      },
    });
  }

  const payload = {
    id: user?.id,
    firstname: user?.first_name,
    lastname: user?.last_name,
    email: user?.email_customer,
    photo: user?.profile_picture,
    status: user?.status,
  };

  const secret = process.env.JWT_SECRET!;

  const expiresIn = 60 * 60 * 1;

  const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

  // return res.redirect(`http://localhost:3000/auth-success?token=${token}`)

  // return res.json({
  //   data: {
  //     id: user.id,
  //     profile_picture: user.profile_picture,
  //     first_name: user.first_name,
  //     middle_name: user.middle_name,
  //     last_name: user.last_name,
  //     email_customer: user.email_customer,
  //     password_customer: user.password_customer,
  //     emergency_contact: user.emergency_contact,
  //     official_identify: user.official_identify,
  //     phone_number: user.phone_number,
  //     country_customer: user.country_customer,
  //     address: user.address,
  //     driver_license_number: user.driver_license_number,
  //     expiration_date: user.expiration_date,
  //     date_of_birth: user.date_of_birth,
  //     status: user.status,
  //   },
  //   token: token,
  // });

  return res.redirect(
    `https://fe-prestige.zenmultimediacorp.com/?token=${token}`
  );
});

module.exports = router;
