import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";
import cookies from "cookie-parser";

export const register = async (userData) => {
  const { name, email, password, profileImage } = userData;

  const existUser = await User.findOne({ email });

  if (existUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profileImage,
  });

  // const token = generateToken(email);

  return user;
};
