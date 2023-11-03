"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleapis_1 = require("googleapis");
const fileUpload_1 = __importDefault(require("../../../utils/fileUpload"));
const joi_1 = __importDefault(require("joi"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
//Register
router.post("/register", (0, fileUpload_1.default)("./storage/customers/"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // cek validasi input firstname, lastname, email, password
    const schema = joi_1.default.object({
        firstname: joi_1.default.string().required(),
        lastname: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    const { firstname, lastname, email, password } = req.body;
    // cek apakah email sudah terdaftar
    const user = yield prisma.customers.findUnique({
        where: {
            email_customer: email,
        },
    });
    if (user) {
        return res.status(409).json({
            message: "Email already exists",
        });
    }
    const photo = `storage/customers/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield prisma.customers.create({
        data: {
            first_name: firstname,
            last_name: lastname,
            email_customer: email,
            profile_picture: photo,
            password_customer: hashedPassword,
            status: "Waiting Approved",
        },
    });
    var transporter = nodemailer_1.default.createTransport({
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
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            res.json({
                message: `This extra step is required to keep your account safe. We'll send a verification to your email ending in : ${email}. Please check carefully in your inbox, spam or promotion.`,
            });
        }
    });
}));
//verifikasi email
router.get("/verify/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const user = yield prisma.customers.findUnique({
        where: {
            email_customer: email,
        },
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    yield prisma.customers.update({
        where: {
            email_customer: email,
        },
        data: {
            status: "Approved",
        },
    });
    const image = process.env.PUBLIC_IMAGE;
    const secret = process.env.JWT_SECRET;
    const expiresIn = 60 * 60 * 1;
    const payload = {
        id: user.id,
        firstname: user.first_name,
        lastname: user.last_name,
        email: user.email_customer,
        photo: `${image}/${user.profile_picture}`,
        isVerified: user.status,
    };
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
    return res.redirect(`https://fe-prestige.zenmultimediacorp.com/?token=${token}`);
}));
//login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.customers.findUnique({
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
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password_customer);
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
        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 60 * 1;
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
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
    }
    else {
        return res.status(403).json({
            message: "Wrong password",
        });
    }
}));
//  GOOGLE
const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `http://${process.env.PUBLIC_IMAGE}:5000/api/auth/google/callback`);
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
router.get("/google/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    const { tokens } = yield oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = googleapis_1.google.oauth2({
        auth: oauth2Client,
        version: "v2",
    });
    const { data } = yield oauth2.userinfo.get();
    if (!data.email || !data.name) {
        return res.json({
            data: data,
        });
    }
    let user = yield prisma.customers.findUnique({
        where: {
            email_customer: data.email,
        },
    });
    if (!user) {
        user = yield prisma.customers.create({
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
        id: user === null || user === void 0 ? void 0 : user.id,
        firstname: user === null || user === void 0 ? void 0 : user.first_name,
        lastname: user === null || user === void 0 ? void 0 : user.last_name,
        email: user === null || user === void 0 ? void 0 : user.email_customer,
        photo: user === null || user === void 0 ? void 0 : user.profile_picture,
        status: user === null || user === void 0 ? void 0 : user.status,
    };
    const secret = process.env.JWT_SECRET;
    const expiresIn = 60 * 60 * 1;
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
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
    return res.redirect(`https://fe-prestige.zenmultimediacorp.com/?token=${token}`);
}));
module.exports = router;
