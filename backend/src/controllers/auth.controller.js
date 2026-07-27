import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { register } from "../services/auth.service.js";

export const signUp = async (req, res) => {
  try {
    const user = await register(req.body);

    res.status(201).json({
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    if (error.message === "User data missing") {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error.message === "User already exists") {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
