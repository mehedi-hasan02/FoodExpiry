import express, { Router } from "express";
import {
  getAllUserController,
  getLoginUserController,
  getUserByEmailController,
  updateUserDataController,
  updateUserPasswordController,
} from "../controllers/user.controller.js";
import { validUpdatePassword } from "../validators/user.validator.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const userRoute = Router();

userRoute.get("/user", getAllUserController);
userRoute.get("/user/me", authMiddleWare, getLoginUserController);
userRoute.get("/user/:email", getUserByEmailController);
userRoute.put("/user", updateUserDataController);
userRoute.put(
  "/user/password",
  validUpdatePassword,
  updateUserPasswordController,
);

export default userRoute;
