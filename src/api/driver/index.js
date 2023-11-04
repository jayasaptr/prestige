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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importStar(require("express"));
const fileUpload_1 = __importDefault(require("../../../utils/fileUpload"));
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
router.patch("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const driver = yield prisma.customers.update({
            where: {
                id: Number(id),
            },
            data: {
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                email_customer: req.body.email_customer,
                driver_license_number: req.body.driver_license_number,
                emergency_contact: req.body.emergency_contact,
                date_of_birth: req.body.date_of_birth,
                expiration_date: req.body.expiration_date,
                phone_number: req.body.phone_number,
                address: req.body.address,
                state_customer: req.body.state_customer,
                country_customer: req.body.country_customer,
                official_identify: req.body.official_identify,
                status: req.body.status,
                car_availability: {
                    update: {
                        primary_financial_goal_id: req.body.primary_financial_goal_id,
                        how_often_family_id: req.body.how_often_family_id,
                        how_often_car_id: req.body.how_often_car_id,
                    },
                },
                driver_goals: {
                    update: {
                        advance_goal_id: req.body.advance_goal_id,
                        maximum_duration_id: req.body.maximum_duration_id,
                        minimum_duration_id: req.body.minimum_duration_id,
                    },
                },
            },
        });
        res.status(200).json({
            message: "Update data success",
            data: driver,
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}));
//update foto profile customer
router.post("/update/foto/:id", (0, fileUpload_1.default)("./storage/customers/"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const cekCustomerId = yield prisma.customers.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });
    if (!cekCustomerId) {
        return res.status(400).json({
            message: "Customer id not found",
        });
    }
    const photo = `storage/customers/${(_b = req.file) === null || _b === void 0 ? void 0 : _b.filename}`;
    try {
        const driver = yield prisma.customers.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                profile_picture: photo,
            },
        });
        const baseUrl = process.env.PUBLIC_IMAGE;
        driver.profile_picture = `${baseUrl}/${driver.profile_picture}`;
        res.status(200).json({
            message: "Update data success",
            data: driver,
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}));
//update foto driver license customer
router.post("/update/foto/license/:id", (0, fileUpload_1.default)("./storage/driver-license/"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const cekCustomerId = yield prisma.customers.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });
    if (!cekCustomerId) {
        return res.status(400).json({
            message: "Customer id not found",
        });
    }
    const photo = `storage/driver-license/${(_c = req.file) === null || _c === void 0 ? void 0 : _c.filename}`;
    try {
        const driver = yield prisma.customers.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                driver_license_image: photo,
            },
        });
        const baseUrl = process.env.PUBLIC_IMAGE;
        driver.driver_license_image = `${baseUrl}/${driver.driver_license_image}`;
        res.status(200).json({
            message: "Update data success",
            data: driver,
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}));
module.exports = router;
