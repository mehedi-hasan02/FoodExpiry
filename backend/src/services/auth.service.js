import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (userData) => {
  const { name, email, password, profileImage } = userData;

  if (!name || !email || !password || !profileImage) {
    throw new Error("User data missing");
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profileImage,
  });

  return user;
};
