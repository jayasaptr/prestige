"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importStar(require("express"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const app = (0, express_1.default)();
//get user role customer data driver
router.get("/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield prisma.customers.findMany({
        select: {
            id: true,
            first_name: true,
            middle_name: true,
            last_name: true,
            email_customer: true,
            profile_picture: true,
            created_at: true,
            updated_at: true,
            driver_license_image: true,
            driver_license_number: true,
            emergency_contact: true,
            date_of_birth: true,
            expiration_date: true,
            phone_number: true,
            address: true,
            state_customer: true,
            country_customer: true,
            official_identify: true,
            status: true,
            driver_goals: {
                select: {
                    advance_goal_id: false,
                    maximum_duration_id: false,
                    minimum_duration_id: false,
                    advance_goal: true,
                    maximum_duration: true,
                    minimum_duration: true,
                },
            },
            car_availability: {
                select: {
                    primary_financial_goal_id: false,
                    how_often_family_id: false,
                    how_often_car_id: false,
                    primary_financial_goal: true,
                    how_often_family: true,
                    how_often_car: true,
                },
            },
        },
        take: 10,
    });
    try {
        // with pagination
        const page = Number(req.params.page);
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const resultDriver = driver.slice(startIndex, endIndex);
        const totalPage = Math.ceil(driver.length / limit);
        const nextPage = page + 1;
        const prevPage = page - 1;
        const pagination = {
            totalPage,
            nextPage,
            prevPage,
        };
        const baseUrl = process.env.PUBLIC_IMAGE;
        resultDriver.map((item) => {
            var _a;
            ((_a = item.profile_picture) === null || _a === void 0 ? void 0 : _a.includes("https://lh3.googleusercontent.com/"))
                ? null
                : (item.profile_picture = `${baseUrl}/${item.profile_picture}`);
            item.driver_license_image = `${baseUrl}/${item.driver_license_image}`;
        });
        res.status(200).json({
            data: resultDriver,
            pagination,
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}));
//detail user role customer data driver
router.get("/detail/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const driver = yield prisma.customers.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            id: true,
            first_name: true,
            middle_name: true,
            last_name: true,
            email_customer: true,
            profile_picture: true,
            created_at: true,
            updated_at: true,
            driver_license_image: true,
            driver_license_number: true,
            emergency_contact: true,
            date_of_birth: true,
            expiration_date: true,
            phone_number: true,
            address: true,
            state_customer: true,
            country_customer: true,
            official_identify: true,
            status: true,
            driver_goals: {
                select: {
                    advance_goal_id: false,
                    maximum_duration_id: false,
                    minimum_duration_id: false,
                    advance_goal: true,
                    maximum_duration: true,
                    minimum_duration: true,
                },
            },
            car_availability: {
                select: {
                    primary_financial_goal_id: false,
                    how_often_family_id: false,
                    how_often_car_id: false,
                    primary_financial_goal: true,
                    how_often_family: true,
                    how_often_car: true,
                },
            },
        },
    });
    try {
        const baseUrl = process.env.PUBLIC_IMAGE;
        ((_a = driver.profile_picture) === null || _a === void 0 ? void 0 : _a.includes("https://lh3.googleusercontent.com/"))
            ? null
            : (driver.profile_picture = `${baseUrl}/${driver.profile_picture}`);
        driver.driver_license_image = `${baseUrl}/${driver.driver_license_image}`;
        res.status(200).json({
            data: driver,
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}));
//update user role customer data driver
module.exports = router;
