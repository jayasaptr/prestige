"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const Utils_1 = require("./Utils");
const imageUpload = (filePath, fieldName, validType = ["jpg", "jpeg", "png"], sizeOf = 2000000) => {
    return (0, multer_1.default)({
        storage: multer_1.default.diskStorage({
            destination: path_1.default.resolve(`./api/images/${filePath}/`),
            filename: (req, file, cb) => {
                const newFile = (0, Utils_1.generateUUID)("", 25).toLocaleLowerCase() +
                    path_1.default.extname(file.originalname);
                req.body[fieldName] = newFile;
                cb(null, newFile);
            },
        }),
        limits: {
            fileSize: sizeOf,
        },
    }).single(fieldName);
};
exports.imageUpload = imageUpload;
