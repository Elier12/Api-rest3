import { Router } from "express";
import { login, register } from "../controllers/authcontroller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../milddewares/validationResultExpress.js";

const router = Router(); //manejador de las rutas interpretar las peticiones

router
  .post(
    "/register",
    [
      body("email", "Formato de email incorecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
      body("password", "Formato de password incorecto")
        .trim()
        .isLength({ min: 6 }),
    ],
    validationResultExpress,
    register
  )
  .post(
    "/login",
    [
      body("email", "Formato de email incorecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
      body("password", "Minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    ],
    validationResultExpress,
    login
  );

export default router;
