import connectDB from "../config/dbConnect.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getAllUserService = async () => {
  await connectDB();
  const users = await User.find();

  return users;
};

export const getUserByEmailService = async (email) => {
  await connectDB();
  const user = await User.findOne({ email });

  return user;
};

export const getLoginUserService = async (id) => {
  await connectDB();
  return await User.findById(id).select("-password");
};

export const updateUserDataService = async (data) => {
  await connectDB();
  const { name, email, profileImage } = data;

  const updateUser = await User.findOneAndUpdate(
    { email },
    { name, profileImage },
    { returnDocument: "after" },
  );

  return updateUser;
};

export const updateUserPasswordService = async (
  email,
  oldPassword,
  newPassword,
) => {
  await connectDB();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await User.findOneAndUpdate(
    { email },
    {
      password: hashedPassword,
    },
    {
      returnDocument: "after",
    },
  );

  return user;
};
