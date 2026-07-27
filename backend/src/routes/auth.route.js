import express, { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";
import { validateRegister } from "../validators/auth.validator.js";

const authRoute = express(Router());

authRoute.post("/signup", validateRegister, signUp);

export default authRoute;
