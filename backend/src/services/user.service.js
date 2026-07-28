import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getAllUserService = async () => {
  const users = await User.find();

  return users;
};

export const getUserByEmailService = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

export const updateUserDataService = async (data) => {
  const { name, email, profileImage } = data;

  const updateUser = await User.findOneAndUpdate(
    { email },
    { name, profileImage },
    { returnDocument: "after" },
  );

  return updateUser;
};

export const updateUserPasswordService = async (email, newPassword) => {
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
