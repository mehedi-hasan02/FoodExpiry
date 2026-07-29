import express, { Router } from "express";
import { logIn, logOut, signUp } from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";
import { upload } from "../middleware/multer.middleware.js";

const authRoute = express(Router());

authRoute.post(
  "/signup",
  upload.single("profileImage"),
  validateRegister,
  signUp,
);
authRoute.post("/login", validateLogin, logIn);
authRoute.post("/logout", logOut);

export default authRoute;
