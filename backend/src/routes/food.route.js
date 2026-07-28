import express, { Router } from "express";
import {
  addFood,
  deleteFood,
  filterFood,
  getAllFood,
  getFoodById,
  searchFood,
  updateFood,
} from "../controllers/food.controller.js";
import {
  validateAddFood,
  validateUpdateFood,
} from "../validators/food.validator.js";

const foodRoute = express(Router());

foodRoute.post("/", validateAddFood, addFood);

foodRoute.get("/", getAllFood);
foodRoute.get("/search", searchFood);
foodRoute.get("/filter", filterFood);
foodRoute.get("/:id", getFoodById);

foodRoute.put("/:id", validateUpdateFood, updateFood);

foodRoute.delete("/:id", deleteFood);

export default foodRoute;
