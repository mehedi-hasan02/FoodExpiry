import express, { Router } from "express";
import {
  logIn,
  logOut,
  signUpController,
} from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";
import { upload } from "../middleware/multer.middleware.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const authRoute = express(Router());

authRoute.post(
  "/signup",
  upload.single("profileImage"),
  validateRegister,
  signUpController,
);
authRoute.post("/login", validateLogin, logIn);
authRoute.post("/logout", logOut);
// authRoute.get("/me", authMiddleWare, getUserDataController);

export default authRoute;
