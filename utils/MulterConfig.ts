import exp from "constants";
import multer from "multer";
import path from "path";
import { generateUUID } from "./Utils";


const imageUpload = (
  filePath: string,
  fieldName: string,
  validType = ["jpg", "jpeg", "png"],
  sizeOf = 2000000
) => {
  return multer({
    storage: multer.diskStorage({
      destination: path.resolve(`./api/images/${filePath}/`),
      filename: (req, file, cb) => {
        const newFile =
          generateUUID("", 25).toLocaleLowerCase() +
          path.extname(file.originalname);
        req.body[fieldName] = newFile;
        cb(null, newFile);
      },
    }),
    limits: {
      fileSize: sizeOf,
    },
  }).single(fieldName);
};

export { imageUpload };
