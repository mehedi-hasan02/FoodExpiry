import uploadOnCloudinary from "../config/cloudinary.js";
import Family from "../models/family.model.js";
import Food from "../models/food.model.js";
import { getExpiryStatus } from "../utils/calculateExpiry.js";

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

  const expiryStatus = getExpiryStatus(expiryDate);

  const food = await Food.create({
    user,
    name,
    category,
    quantity,
    unit,
    expiryDate,
    image: imageUrl,
    location,
    status: expiryStatus,
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

export const getFamilyFoodService = async (id) => {
  const familyMembers = await Family.findOne({
    $or: [{ owner: id }, { "members.user": id }],
  });

  if (!familyMembers) {
    return [];
  }

  // owner + members
  const usersId = [
    familyMembers.owner,
    ...familyMembers.members.map((member) => member.user),
  ];

  const uniqueUserId = [...new Set(usersId.map((id) => id.toString()))];

  const familyFoods = await Food.find({
    user: { $in: uniqueUserId },
  });

  return familyFoods;
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

export const foodNeedToReminder = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  const food = await Food.find({
    expiryDate: {
      $gte: today,
      $lte: threeDaysLater,
    },
  })
    .populate("user", "name email")
    .lean();

  return food;
};
