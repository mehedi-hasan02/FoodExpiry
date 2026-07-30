import express, { Router } from "express";
import {
  addFood,
  deleteFoodController,
  getAllFoodController,
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
foodRoute.get("/food/search", searchFoodController);
foodRoute.get("/food/:id", getFoodByIdController);

foodRoute.put("/food/:id", upload.single("image"), authMiddleWare, updateFood);

foodRoute.delete("/food/:id", validateDeleteFood, deleteFoodController);

export default foodRoute;
