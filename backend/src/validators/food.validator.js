import Food from "../models/food.model.js";

export const validateAddFood = (req, res, next) => {
  const { user, name, category, quantity, unit, expiryDate } = req.body;
  if (
    !user ||
    !name ||
    !category ||
    quantity === undefined ||
    !unit ||
    !expiryDate
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (isNaN(new Date(expiryDate).getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid expiry date",
    });
  }

  const expiry = new Date(expiryDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const dateDifferent = expiry - today;

  console.log(dateDifferent);

  if (dateDifferent < 0) {
    return res.status(400).json({
      seccess: false,
      message: "Expiry date must be today or in the future",
    });
  }

  next();
};

export const validateUpdateFood = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No data provided for update",
    });
  }
  const { expiryDate } = req.body;

  // Validate expiryDate only if it is being updated
  if (expiryDate !== undefined) {
    const expiry = new Date(expiryDate);

    // Check invalid date
    if (isNaN(expiry.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid expiry date",
      });
    }

    const today = new Date();

    // Compare only dates, not time
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    if (expiry < today) {
      return res.status(400).json({
        success: false,
        message: "Expiry date must be today or in the future",
      });
    }
  }

  next();
};

export const validateDeleteFood = async (req, res, next) => {
  const findFood = await Food.findById(req.params.id);

  if (!findFood) {
    return res.status(404).json({
      message: "Food not found",
    });
  }

  next();
};
