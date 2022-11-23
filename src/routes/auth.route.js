import { Router } from "express";
import { login, register,infoUser } from "../controllers/authcontroller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../milddewares/validationResultExpress.js";
import{requireToken} from "../milddewares/requireAuth.js"

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
      body("password", "Formato de password incorecto")
        .trim()
        .isLength({ min: 6 }),
    ],
    validationResultExpress,
    login
  )
.get("/protected",requireToken,infoUser)

export default router;
