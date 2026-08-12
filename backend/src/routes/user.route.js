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
import { upload } from "../middleware/multer.middleware.js";

const userRoute = Router();

userRoute.get("/user", getAllUserController);
userRoute.get("/user/me", authMiddleWare, getLoginUserController);
userRoute.get("/user/:email", getUserByEmailController);
userRoute.put(
  "/user/update",
  authMiddleWare,
  upload.single("profileImage"),
  updateUserDataController,
);
userRoute.put(
  "/user/change-password",
  authMiddleWare,
  validUpdatePassword,
  updateUserPasswordController,
);

export default userRoute;
