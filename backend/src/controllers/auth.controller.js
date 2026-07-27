import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { register } from "../services/auth.service.js";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req, res, next) => {
  try {
    const user = await register(req.body);

    const token = generateToken(user.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};
