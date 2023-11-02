import { PrismaClient } from "@prisma/client";
import express, { Router } from "express";
import Joi from "joi";
import fileUpload from "../../../utils/fileUpload";

const prisma = new PrismaClient();
const router = Router();
const app = express();

app.use(express.json());

//post goal driver license
router.post(
  "/driver-licences",
  fileUpload("./storage/driver-license/"),
  async (req, res) => {
    const schema = Joi.object({
      customer_id: Joi.string().required(),
      driver_license_number: Joi.string().required(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      phone_number: Joi.string().required(),
      expiration_date: Joi.date().required(),
      date_of_birth: Joi.date().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const {
      customer_id,
      driver_license_number,
      country,
      state,
      phone_number,
      expiration_date,
      date_of_birth,
    } = req.body;

    //cek jika id tidak ada di table customers
    const cekCustomerId = await prisma.customers.findUnique({
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

    const photo = `storage/driver-license/${req.file?.filename}`;

    const driverLicense = await prisma.customers.update({
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
  }
);

//get dropdown primary_financial_goal
router.get("/primary-financial-goals/:page", async (req, res) => {
  const primaryFinancialGoals = await prisma.primary_financial_goal.findMany({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

//get dropdown how_often_family
router.get("/how-often-family/:page", async (req, res) => {
  const howOftenFamily = await prisma.how_often_family.findMany({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

//get dropdown how_often_car
router.get("/how-often-car/:page", async (req, res) => {
  const howOftenCar = await prisma.how_often_car.findMany({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

//get dropdown advance goal
router.get("/advance-goals/:page", async (req, res) => {
  const advanceGoals = await prisma.advance_goal.findMany({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

//get dropdown minimum duration
router.get("/minimum-duration/:page", async (req, res) => {
  const minimumDuration = await prisma.minimum_duration.findMany({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

//get dropdown maximum duration
router.get("/maximum-duration/:page", async (req, res) => {
  const maximumDuration = await prisma.maximum_duration.findMany({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

//post car availability goal
router.post("/car-availability", async (req, res) => {
  const schema = Joi.object({
    customer_id: Joi.string().required(),
    primary_financial_goal_id: Joi.string().required(),
    how_often_family_id: Joi.string().required(),
    how_often_car_id: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const {
    customer_id,
    primary_financial_goal_id,
    how_often_family_id,
    how_often_car_id,
  } = req.body;

  //cek apakah user sudah pernah mengisi car availability goal

  const cekCarAvailability = await prisma.car_availability.findMany({
    where: {
      customer_id: Number(customer_id),
    },
  });

  if (cekCarAvailability.length > 0) {
    // cari id car availability goal sesuai dengan customer_id
    const idCarAvailability = await prisma.car_availability.findFirst({
      where: {
        customer_id: Number(customer_id),
      },
    });

    // update car availability goal jika sudah pernah mengisi
    const updateCarAvailability = await prisma.car_availability.update({
      where: {
        id: idCarAvailability?.id,
      },
      data: {
        primary_financial_goal_id: Number(primary_financial_goal_id),
        how_often_family_id: Number(how_often_family_id),
        how_often_car_id: Number(how_often_car_id),
      },
    });

    return res.json({
      message: "Car availability goal has been updated",
      data: {
        customer_id: Number(customer_id),
        primary_financial_goal_id: Number(primary_financial_goal_id),
        how_often_family_id: Number(how_often_family_id),
        how_often_car_id: Number(how_often_car_id),
      },
    });
  }

  const carAvailability = await prisma.car_availability.create({
    data: {
      customer_id: Number(customer_id),
      primary_financial_goal_id: Number(primary_financial_goal_id),
      how_often_family_id: Number(how_often_family_id),
      how_often_car_id: Number(how_often_car_id),
    },
  });

  res.json({
    message: "Car availability goal has been created",
    data: {
      customer_id: Number(customer_id),
      primary_financial_goal_id: Number(primary_financial_goal_id),
      how_often_family_id: Number(how_often_family_id),
      how_often_car_id: Number(how_often_car_id),
    },
  });
});

//post goals_user
router.post("/goals-user", async (req, res) => {
  const schema = Joi.object({
    customer_id: Joi.string().required(),
    advance_goal_id: Joi.string().required(),
    minimum_duration_id: Joi.string().required(),
    maximum_duration_id: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const {
    customer_id,
    advance_goal_id,
    minimum_duration_id,
    maximum_duration_id,
  } = req.body;

  //cek apakah user sudah pernah mengisi goals_user

  const cekGoalsUser = await prisma.driver_goals.findMany({
    where: {
      customer_id: Number(customer_id),
    },
  });

  if (cekGoalsUser.length > 0) {
    // cari id goals_user sesuai dengan customer_id
    const idGoalsUser = await prisma.driver_goals.findFirst({
      where: {
        customer_id: Number(customer_id),
      },
    });

    // update goals_user jika sudah pernah mengisi
    const updateGoalsUser = await prisma.driver_goals.update({
      where: {
        id: idGoalsUser?.id,
      },
      data: {
        advance_goal_id: Number(advance_goal_id),
        minimum_duration_id: Number(minimum_duration_id),
        maximum_duration_id: Number(maximum_duration_id),
      },
    });

    return res.json({
      message: "Goals user has been updated",
      data: {
        customer_id: Number(customer_id),
        advance_goal_id: Number(advance_goal_id),
        minimum_duration_id: Number(minimum_duration_id),
        maximum_duration_id: Number(maximum_duration_id),
      },
    });
  }

  const goalsUser = await prisma.driver_goals.create({
    data: {
      customer_id: Number(customer_id),
      advance_goal_id: Number(advance_goal_id),
      minimum_duration_id: Number(minimum_duration_id),
      maximum_duration_id: Number(maximum_duration_id),
    },
  });

  res.json({
    message: "Goals user has been created",
    data: {
      customer_id: Number(customer_id),
      advance_goal_id: Number(advance_goal_id),
      minimum_duration_id: Number(minimum_duration_id),
      maximum_duration_id: Number(maximum_duration_id),
    },
  });
});

module.exports = router;
