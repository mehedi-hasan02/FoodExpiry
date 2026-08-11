import uploadOnCloudinary from "../config/cloudinary.js";
import connectDB from "../config/dbConnect.js";
import Family from "../models/family.model.js";
import Food from "../models/food.model.js";
import User from "../models/user.model.js";
import { getExpiryStatus } from "../utils/calculateExpiry.js";

export const insertFood = async (data) => {
  await connectDB();
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
  await connectDB();
  const updatedFood = await Food.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updatedFood;
};

export const deleteFoodService = async (id) => {
  await connectDB();
  const deleteFood = await Food.findByIdAndDelete(id);

  return deleteFood;
};

export const getAllFoodService = async () => {
  await connectDB();
  const foods = await Food.find();

  return foods;
};

export const getMyFoodService = async (id) => {
  await connectDB();
  const foods = await Food.find({ user: id });

  return foods;
};

export const getFamilyFoodService = async (id) => {
  await connectDB();

  const family = await Family.findOne({
    $or: [{ owner: id }, { "members.user": id }],
  })
    .populate("owner", "name email profileImage")
    .populate("members.user", "name email profileImage")
    .lean();

  if (!family) {
    const familyFoods = await Food.find({
      user: id,
    }).lean();

    return {
      familyName: null,
      familyFoods,
      familyMembers: [],
    };
  }

  const owner = {
    _id: family.owner._id,
    name: family.owner.name,
    email: family.owner.email,
    profileImage: family.owner.profileImage,
    role: "Owner",
  };

  const members = family.members.map((member) => ({
    _id: member.user._id,
    name: member.user.name,
    email: member.user.email,
    profileImage: member.user.profileImage,
    role: member.role,
    joinedAt: member.joinedAt,
  }));

  const userIds = [
    family.owner._id,
    ...family.members.map((member) => member.user._id),
  ];

  const uniqueUserIds = [...new Set(userIds.map((id) => id.toString()))];

  const familyFoods = await Food.find({
    user: { $in: uniqueUserIds },
  }).lean();

  return {
    familyName: family.familyName,
    familyFoods,
    familyMembers: [...members],
  };
};

export const getFoodByIdService = async (id) => {
  await connectDB();
  return await Food.findById(id);
};

export const searchFoodService = async (
  name = "",
  category = "",
  location = "",
  status = "",
) => {
  await connectDB();
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
  await connectDB();
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
