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
const joi_1 = __importDefault(require("joi"));
const fileUpload_1 = __importDefault(require("../../../utils/fileUpload"));
const token_1 = require("../../../utils/token");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
//post goal driver license
router.post("/driver-licences", (0, fileUpload_1.default)("./storage/driver-license/"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const schema = joi_1.default.object({
        customer_id: joi_1.default.string().required(),
        driver_license_number: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
        phone_number: joi_1.default.string().required(),
        expiration_date: joi_1.default.date().required(),
        date_of_birth: joi_1.default.date().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    const { customer_id, driver_license_number, country, state, phone_number, expiration_date, date_of_birth, } = req.body;
    //cek jika id tidak ada di table customers
    const cekCustomerId = yield prisma.customers.findUnique({
        where: {
            id: Number(customer_id),
        },
    });
    if (!cekCustomerId) {
        return res.status(400).json({
            message: "Customer id not found",
        });
    }
    //  expiration_date_format dd mm yyyy
    const expiration_date_format = new Date(expiration_date);
    //  date_of_birth_format dd mm yyyy
    const date_of_birth_format = new Date(date_of_birth);
    const photo = `storage/driver-license/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
    const driverLicense = yield prisma.customers.update({
        where: {
            id: Number(customer_id),
        },
        data: {
            driver_license_number: Number(driver_license_number),
            country_customer: country,
            driver_license_image: photo,
            state_customer: state,
            phone_number: phone_number,
            expiration_date: expiration_date_format,
            date_of_birth: date_of_birth_format,
        },
    });
    res.json({
        message: "Driver license has been created",
        data: {
            customer_id: Number(customer_id),
            driver_license_number: Number(driver_license_number),
            country_customer: country,
            state_customer: state,
            driver_license_image: `${process.env.PUBLIC_IMAGE}/${photo}`,
            phone_number: phone_number,
            expiration_date: expiration_date,
            date_of_birth: date_of_birth,
        },
    });
}));
//get dropdown primary_financial_goal
router.get("/primary-financial-goals/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const primaryFinancialGoals = yield prisma.primary_financial_goal.findMany({
        take: 10,
    });
    try {
        // with pagination
        const page = Number(req.params.page);
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = primaryFinancialGoals.slice(startIndex, endIndex);
        const totalPage = Math.ceil(primaryFinancialGoals.length / limit);
        const nextPage = page + 1;
        const prevPage = page - 1;
        const pagination = {
            totalPage,
            nextPage,
            prevPage,
        };
        res.json({
            success: true,
            message: "Primary financial goals",
            data: result,
            pagination,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
}));
//get dropdown how_often_family
router.get("/how-often-family/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const howOftenFamily = yield prisma.how_often_family.findMany({
        take: 10,
    });
    try {
        // with pagination
        const page = Number(req.params.page);
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = howOftenFamily.slice(startIndex, endIndex);
        const totalPage = Math.ceil(howOftenFamily.length / limit);
        const nextPage = page + 1;
        const prevPage = page - 1;
        const pagination = {
            totalPage,
            nextPage,
            prevPage,
        };
        res.json({
            success: true,
            message: "How often family",
            data: result,
            pagination,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
}));
//get dropdown how_often_car
router.get("/how-often-car/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const howOftenCar = yield prisma.how_often_car.findMany({
        take: 10,
    });
    try {
        // with pagination
        const page = Number(req.params.page);
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = howOftenCar.slice(startIndex, endIndex);
        const totalPage = Math.ceil(howOftenCar.length / limit);
        const nextPage = page + 1;
        const prevPage = page - 1;
        const pagination = {
            totalPage,
            nextPage,
            prevPage,
        };
        res.json({
            success: true,
            message: "How often car",
            data: result,
            pagination,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
}));
//get dropdown advance goal
router.get("/advance-goals/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const advanceGoals = yield prisma.advance_goal.findMany({
        take: 10,
    });
    try {
        // with pagination
        const page = Number(req.params.page);
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = advanceGoals.slice(startIndex, endIndex);
        const totalPage = Math.ceil(advanceGoals.length / limit);
        const nextPage = page + 1;
        const prevPage = page - 1;
        const pagination = {
            totalPage,
            nextPage,
            prevPage,
        };
        res.json({
            success: true,
            message: "Advance goals",
            data: result,
            pagination,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
}));
//get dropdown minimum duration
router.get("/minimum-duration/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const minimumDuration = yield prisma.minimum_duration.findMany({
        take: 10,
    });
    try {
        // with pagination
        const page = Number(req.params.page);
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = minimumDuration.slice(startIndex, endIndex);
        const totalPage = Math.ceil(minimumDuration.length / limit);
        const nextPage = page + 1;
        const prevPage = page - 1;
        const pagination = {
            totalPage,
            nextPage,
            prevPage,
        };
        res.json({
            success: true,
            message: "Minimum duration",
            data: result,
            pagination,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
}));
//get dropdown maximum duration
router.get("/maximum-duration/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maximumDuration = yield prisma.maximum_duration.findMany({
        take: 10,
    });
    try {
        // with pagination
        const page = Number(req.params.page);
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = maximumDuration.slice(startIndex, endIndex);
        const totalPage = Math.ceil(maximumDuration.length / limit);
        const nextPage = page + 1;
        const prevPage = page - 1;
        const pagination = {
            totalPage,
            nextPage,
            prevPage,
        };
        res.json({
            success: true,
            message: "Maximum duration",
            data: result,
            pagination,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
}));
//post car availability goal
router.post("/car-availability", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        customer_id: joi_1.default.string().required(),
        primary_financial_goal_id: joi_1.default.string().required(),
        how_often_family_id: joi_1.default.string().required(),
        how_often_car_id: joi_1.default.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    const { customer_id, primary_financial_goal_id, how_often_family_id, how_often_car_id, } = req.body;
    //cek jika id tidak ada di table customers
    const cekCustomerId = yield prisma.customers.findUnique({
        where: {
            id: Number(customer_id),
        },
    });
    if (!cekCustomerId) {
        return res.status(400).json({
            message: "Customer id not found",
        });
    }
    //cek jika id tidak ada di table primary_financial_goal
    const cekPrimaryFinancialGoalId = yield prisma.primary_financial_goal.findUnique({
        where: {
            id: Number(primary_financial_goal_id),
        },
    });
    if (!cekPrimaryFinancialGoalId) {
        return res.status(400).json({
            message: "Primary financial goal id not found",
        });
    }
    //cek jika id tidak ada di table how_often_family
    const cekHowOftenFamilyId = yield prisma.how_often_family.findUnique({
        where: {
            id: Number(how_often_family_id),
        },
    });
    if (!cekHowOftenFamilyId) {
        return res.status(400).json({
            message: "How often family id not found",
        });
    }
    //cek jika id tidak ada di table how_often_car
    const cekHowOftenCarId = yield prisma.how_often_car.findUnique({
        where: {
            id: Number(how_often_car_id),
        },
    });
    if (!cekHowOftenCarId) {
        return res.status(400).json({
            message: "How often car id not found",
        });
    }
    //update jika car availability id sudah ada di table customers
    const cekCarAvailability = yield prisma.customers.findUnique({
        where: {
            id: Number(customer_id),
        },
        include: {
            car_availability: true,
        },
    });
    if (cekCarAvailability === null || cekCarAvailability === void 0 ? void 0 : cekCarAvailability.car_availability) {
        const carAvailability = yield prisma.car_availability.update({
            where: {
                id: cekCarAvailability.car_availability.id,
            },
            data: {
                primary_financial_goal_id: Number(primary_financial_goal_id),
                how_often_family_id: Number(how_often_family_id),
                how_often_car_id: Number(how_often_car_id),
            },
        });
        return res.json({
            message: "Car availability has been updated",
            data: {
                customer_id: Number(customer_id),
                primary_financial_goal_id: Number(primary_financial_goal_id),
                how_often_family_id: Number(how_often_family_id),
                how_often_car_id: Number(how_often_car_id),
            },
        });
    }
    //create car availability untuk customer id
    const carAvailability = yield prisma.car_availability.create({
        data: {
            customers: {
                connect: {
                    id: Number(customer_id),
                },
            },
            primary_financial_goal_id: Number(primary_financial_goal_id),
            how_often_family_id: Number(how_often_family_id),
            how_often_car_id: Number(how_often_car_id),
        },
    });
    res.json({
        message: "Car availability has been created",
        data: {
            customer_id: Number(customer_id),
            primary_financial_goal_id: Number(primary_financial_goal_id),
            how_often_family_id: Number(how_often_family_id),
            how_often_car_id: Number(how_often_car_id),
        },
    });
}));
//Post Goal User
router.post("/goals-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        customer_id: joi_1.default.string().required(),
        advance_goal_id: joi_1.default.string().required(),
        minimum_duration_id: joi_1.default.string().required(),
        maximum_duration_id: joi_1.default.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    const { customer_id, advance_goal_id, minimum_duration_id, maximum_duration_id, } = req.body;
    //cek jika id tidak ada di table customers
    const cekCustomerId = yield prisma.customers.findUnique({
        where: {
            id: Number(customer_id),
        },
    });
    if (!cekCustomerId) {
        return res.status(400).json({
            message: "Customer id not found",
        });
    }
    //cek jika id tidak ada di table advance_goal
    const cekAdvanceGoalId = yield prisma.advance_goal.findUnique({
        where: {
            id: Number(advance_goal_id),
        },
    });
    if (!cekAdvanceGoalId) {
        return res.status(400).json({
            message: "Advance goal id not found",
        });
    }
    //cek jika id tidak ada di table minimum_duration
    const cekMinimumDurationId = yield prisma.minimum_duration.findUnique({
        where: {
            id: Number(minimum_duration_id),
        },
    });
    if (!cekMinimumDurationId) {
        return res.status(400).json({
            message: "Minimum duration id not found",
        });
    }
    //cek jika id tidak ada di table maximum_duration
    const cekMaximumDurationId = yield prisma.maximum_duration.findUnique({
        where: {
            id: Number(maximum_duration_id),
        },
    });
    if (!cekMaximumDurationId) {
        return res.status(400).json({
            message: "Maximum duration id not found",
        });
    }
    //update jika goal user id sudah ada di table customers
    const cekGoalUser = yield prisma.customers.findUnique({
        where: {
            id: Number(customer_id),
        },
        include: {
            driver_goals: true,
        },
    });
    if (cekGoalUser === null || cekGoalUser === void 0 ? void 0 : cekGoalUser.driver_goals) {
        const goalUser = yield prisma.driver_goals.update({
            where: {
                id: cekGoalUser.driver_goals.id,
            },
            data: {
                advance_goal_id: Number(advance_goal_id),
                minimum_duration_id: Number(minimum_duration_id),
                maximum_duration_id: Number(maximum_duration_id),
            },
        });
        return res.json({
            message: "Goal user has been updated",
            data: {
                customer_id: Number(customer_id),
                advance_goal_id: Number(advance_goal_id),
                minimum_duration_id: Number(minimum_duration_id),
                maximum_duration_id: Number(maximum_duration_id),
            },
        });
    }
    //create goal user untuk customer id
    const goalUser = yield prisma.driver_goals.create({
        data: {
            customers: {
                connect: {
                    id: Number(customer_id),
                },
            },
            advance_goal_id: Number(advance_goal_id),
            minimum_duration_id: Number(minimum_duration_id),
            maximum_duration_id: Number(maximum_duration_id),
        },
    });
    res.json({
        message: "Goal user has been created",
        data: {
            customer_id: Number(customer_id),
            advance_goal_id: Number(advance_goal_id),
            minimum_duration_id: Number(minimum_duration_id),
            maximum_duration_id: Number(maximum_duration_id),
        },
    });
}));
//get user with jwt
router.get("/user", token_1.accessValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userData } = req;
    const user = yield prisma.customers.findUnique({
        where: {
            id: Number(userData.id),
        },
    });
    const image = process.env.PUBLIC_IMAGE;
    res.json({
        message: "User",
        data: {
            id: user.id,
            profile_picture: `${image}/${user.profile_picture}`,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            email_customer: user.email_customer,
            emergency_contact: user.emergency_contact,
            official_identify: user.official_identify,
            phone_number: user.phone_number,
            country_customer: user.country_customer,
            address: user.address,
            driver_license_number: user.driver_license_number,
            expiration_date: user.expiration_date,
            date_of_birth: user.date_of_birth,
            statusEmail: user.status,
            statusDriver: user.driver_status,
        },
    });
}));
module.exports = router;
