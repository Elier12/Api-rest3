import { validationResult, body, param } from "express-validator";
import axios from "axios";
export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const paramsValidator = [
  param("id","Fomato no Valido")
    .trim()
    .notEmpty()
    .escape(),
    validationResultExpress
]

export const bodyLinkValidator = [
  body("longLink", "Formato Link incorecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (value.startsWith("http://")) {
          value = "http://" + value;
        }
        await axios.get(value);
        return value;
      } catch (error) {
        console.log(error);
        throw new Error("Not found 404", error);
      }
    }),
  validationResultExpress,
];
export const bodyRegisterValidator = [
  body("email", "Formato de email incorecto").trim().isEmail().normalizeEmail(),
  body("password", "Formato de password incorecto").trim().isLength({ min: 6 }),
  validationResultExpress,
];

export const bodyLogibValidator = [
  body("email", "Formato de email incorecto").trim().isEmail().normalizeEmail(),
  body("password", "Formato de password incorecto").trim().isLength({ min: 6 }),
  validationResultExpress,
];
