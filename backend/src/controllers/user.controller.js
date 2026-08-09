import {
  getAllUserService,
  getLoginUserService,
  getUserByEmailService,
  updateUserDataService,
  updateUserPasswordService,
} from "../services/user.service.js";

export const getAllUserController = async (req, res, next) => {
  try {
    const users = await getAllUserService();
    if (!users) {
      return res.status(404).json({
        message: "No user available",
      });
    }

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserByEmailController = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmailService(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const getLoginUserController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await getLoginUserService(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateUserDataController = async (req, res) => {
  try {
    const updatedUser = await updateUserDataService(req.body);

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateUserPasswordController = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await updateUserPasswordService(
      req.user.email,
      oldPassword,
      newPassword,
    );

    res.status(200).json({
      message: "Password update successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};
