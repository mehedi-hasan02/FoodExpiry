import uploadOnCloudinary from "../config/cloudinary.js";
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

  let imageUrl = "";
  if (image) {
    imageUrl = await uploadOnCloudinary(image);
  }

  const food = await Food.create({
    user,
    name,
    category,
    quantity,
    unit,
    expiryDate,
    image: imageUrl,
    location,
    status,
    notes,
  });

  return food;
};

export const updateFoodService = async (id, data) => {
  const updatedFood = await Food.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updatedFood;
};

export const deleteFoodService = async (id) => {
  const deleteFood = await Food.findByIdAndDelete(id);

  return deleteFood;
};

export const getAllFoodService = async () => {
  const foods = await Food.find();

  return foods;
};

export const getMyFoodService = async (id) => {
  // console.log(id);
  const foods = await Food.find({ user: id });
  // console.log(foods);

  return foods;
};

export const getFoodByIdService = async (id) => {
  return await Food.findById(id);
};

export const searchFoodService = async (
  name = "",
  category = "",
  location = "",
  status = "",
) => {
  const query = {};
  if (name) {
    query.name = {
      $regex: name,
      $options: "i",
    };
  }

  if (category) {
    query.category = {
      $regex: category,
      $options: "i",
    };
  }

  if (location) {
    query.location = {
      $regex: location,
      $options: "i",
    };
  }

  if (status) {
    query.status = {
      $regex: status,
      $options: "i",
    };
  }
  return await Food.find(query);
};
