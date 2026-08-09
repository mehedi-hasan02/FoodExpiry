import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const validUpdatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(oldPassword, user.password);

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
