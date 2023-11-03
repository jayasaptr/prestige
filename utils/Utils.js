"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUID = void 0;
const nanoid_1 = require("nanoid");
const generateUUID = (startWith = "", length = 8) => {
    const nanoid = (0, nanoid_1.customAlphabet)("1234567890ABCDEFGHIZKLMNOPQRSTUV", length);
    return `${startWith}${nanoid()}`;
};
exports.generateUUID = generateUUID;
