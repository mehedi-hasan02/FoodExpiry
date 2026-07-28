import { insertFood } from "../services/food.service.js";

export const addFood = async (req, res, next) => {
  try {
    const food = await insertFood(req.body);

    res.status(201).json({
      message: "Food inserted successfully",
      food,
    });
  } catch (error) {
    next(error);
  }
};
export const updateFood = async (req, res, next) => {};
export const deleteFood = async (req, res, next) => {};
export const getAllFood = async (req, res, next) => {};
export const getFoodById = async (req, res, next) => {};
export const searchFood = async (req, res, next) => {};
export const filterFood = async (req, res, next) => {};
