import express, { Router } from "express";
import {
  addFood,
  deleteFoodController,
  getAllFoodController,
  getFamilyFoodController,
  getFoodByIdController,
  getMyFoodController,
  searchFoodController,
  updateFood,
} from "../controllers/food.controller.js";
import {
  validateAddFood,
  validateDeleteFood,
  validateUpdateFood,
} from "../validators/food.validator.js";
import { upload } from "../middleware/multer.middleware.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const foodRoute = express(Router());

foodRoute.post(
  "/food",
  upload.single("image"),
  authMiddleWare,
  validateAddFood,
  addFood,
);

foodRoute.get("/food", getAllFoodController);
foodRoute.get("/myfoods", authMiddleWare, getMyFoodController);
foodRoute.get("/food/family", authMiddleWare, getFamilyFoodController);
foodRoute.get("/food/search", authMiddleWare, searchFoodController);
foodRoute.get("/food/:id", authMiddleWare, getFoodByIdController);

foodRoute.put("/food/:id", upload.single("image"), authMiddleWare, updateFood);

foodRoute.delete(
  "/food/:id",
  authMiddleWare,
  validateDeleteFood,
  deleteFoodController,
);

export default foodRoute;
