import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  getUserDataService,
  loginUser,
  register,
} from "../services/auth.service.js";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req, res, next) => {
  try {
    // console.log();
    const profileImage = req.file?.path;
    const user = await register({
      ...req.body,
      profileImage,
    });

    // console.log(user);

    const token = generateToken(user._id, user.email);

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

export const logIn = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    const token = generateToken(user._id, user.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDataController = async (req, res, next) => {
  try {
    const user = await getUserDataService(req.user.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
