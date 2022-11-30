import { Router } from "express";
import {
  login,
  register,
  infoUser,
  refreshTokens,
  logout,
} from "../controllers/authcontroller.js";
import { requireToken } from "../milddewares/requireAuth.js";
import { requireRefreshToken } from "../milddewares/requireRefreshToken.js";
import {
  bodyLogibValidator,
  bodyRegisterValidator,
} from "../milddewares/validatorManager.js";

const router = Router(); //manejador de las rutas interpretar las peticiones

router
  .post("/register", bodyRegisterValidator, register)
  .post("/login", bodyLogibValidator, login)
  .get("/protected", requireToken, infoUser)
  .get("/refresh", requireRefreshToken, refreshTokens)
  .get("/logout", logout);

export default router;
