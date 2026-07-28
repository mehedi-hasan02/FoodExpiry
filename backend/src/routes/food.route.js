import express, { Router } from "express";
import {
  addFood,
  deleteFoodController,
  getAllFoodController,
  getFoodByIdController,
  searchFoodController,
  updateFood,
} from "../controllers/food.controller.js";
import {
  validateAddFood,
  validateDeleteFood,
  validateUpdateFood,
} from "../validators/food.validator.js";

const foodRoute = express(Router());

foodRoute.post("/", validateAddFood, addFood);

foodRoute.get("/", getAllFoodController);
foodRoute.get("/search", searchFoodController);
foodRoute.get("/:id", getFoodByIdController);

foodRoute.put("/:id", validateUpdateFood, updateFood);

foodRoute.delete("/:id", validateDeleteFood, deleteFoodController);

export default foodRoute;
