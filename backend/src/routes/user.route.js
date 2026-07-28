import express, { Router } from "express";
import {
  getAllUserController,
  getUserByEmailController,
  updateUserDataController,
  updateUserPasswordController,
} from "../controllers/user.controller.js";
import { validUpdatePassword } from "../validators/user.validator.js";

const userRoute = Router();

userRoute.get("/", getAllUserController);
userRoute.get("/:email", getUserByEmailController);
userRoute.put("/", updateUserDataController);
userRoute.put("/password", validUpdatePassword, updateUserPasswordController);

export default userRoute;
