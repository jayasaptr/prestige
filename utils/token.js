"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessValidation = (req, res, next) => {
    const validationReq = req;
    const { authorization } = validationReq.headers;
    if (!authorization) {
        return res.status(401).json({
            message: "Token diperlukan",
        });
    }
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    try {
        const jwtDecode = jsonwebtoken_1.default.verify(token, secret);
        if (typeof jwtDecode !== "string") {
            validationReq.userData = jwtDecode;
        }
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    next();
};
exports.accessValidation = accessValidation;
