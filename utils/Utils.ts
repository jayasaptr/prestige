import { customAlphabet } from "nanoid";
const generateUUID = (startWith = "", length = 8) => {
  const nanoid = customAlphabet("1234567890ABCDEFGHIZKLMNOPQRSTUV", length);
  return `${startWith}${nanoid()}`;
};

export { generateUUID };
