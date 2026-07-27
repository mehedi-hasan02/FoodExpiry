import express, { Router } from "express";
import { logIn, logOut, signUp } from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";

const authRoute = express(Router());

authRoute.post("/signup", validateRegister, signUp);
authRoute.post("/login", validateLogin, logIn);
authRoute.post("/logout", logOut);

export default authRoute;
