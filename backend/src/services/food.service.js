import Food from "../models/food.model.js";

export const insertFood = async (data) => {
  const {
    user,
    name,
    category,
    quantity,
    unit,
    expiryDate,
    image,
    location,
    status,
    notes,
  } = data;

  const food = await Food.create({
    user,
    name,
    category,
    quantity,
    unit,
    expiryDate,
    image,
    location,
    status,
    notes,
  });

  return food;
};
