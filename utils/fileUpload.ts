import { Request } from "express";

const multer = require("multer");
const path = require("path");

const storage = (destination: any) =>
  multer.diskStorage({
    destination: destination,
    filename: (req: Request, file: any, cb: any) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

const fileUpload = (destination: any) =>
  multer({
    storage: storage(destination),
    limits: {
      fileSize: 2 * 1024 * 1024, //2mb,
    },
    fileFilter: (req: Request, file: any, cb: any) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
    onError: function (err: any, next: any) {
      return console.log("error", err);
      next(err);
    },
  }).single("photo");

export = fileUpload;
