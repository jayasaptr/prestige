import { PrismaClient } from "@prisma/client";
import express, { Router } from "express";
import Joi from "joi";
import fileUpload from "../../../utils/fileUpload";

const prisma = new PrismaClient();
const router = Router();
const app = express();

//get user role customer data driver
router.get("/:page", async (req, res) => {
  const driver = await prisma.customers.findMany({
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
      item.profile_picture?.includes("https://lh3.googleusercontent.com/")
        ? null
        : (item.profile_picture = `${baseUrl}/${item.profile_picture}`);
      item.driver_license_image = `${baseUrl}/${item.driver_license_image}`;
    });

    res.status(200).json({
      data: resultDriver,
      pagination,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
