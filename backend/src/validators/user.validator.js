import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const validUpdatePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
