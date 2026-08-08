import {
  deleteFoodService,
  getAllFoodService,
  getFamilyFoodService,
  getFoodByIdService,
  getMyFoodService,
  insertFood,
  searchFoodService,
  updateFoodService,
} from "../services/food.service.js";

export const addFood = async (req, res, next) => {
  try {
    let image = req.file?.path;
    const food = await insertFood({
      ...req.body,
      image,
    });

    res.status(201).json({
      message: "Food inserted successfully",
      food,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const updatedFood = await updateFoodService(req.params.id, req.body);

    res.status(200).json({
      message: "Food updated successfully",
      updatedFood,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFoodController = async (req, res, next) => {
  try {
    const deletedFood = await deleteFoodService(req.params.id);

    res.status(200).json({
      message: "Food deleted successful",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFoodController = async (req, res, next) => {
  try {
    const allFoods = await getAllFoodService();

    res.status(200).json({
      message: "All foods",
      allFoods,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyFoodController = async (req, res, next) => {
  try {
    const foods = await getMyFoodService(req.user.id);

    res.status(200).json({
      success: true,
      foods,
    });
  } catch (error) {
    next(error);
  }
};

export const getFamilyFoodController = async (req, res, next) => {
  try {
    const familyFoods = await getFamilyFoodService(req.user.id);

    res.status(200).json({ familyFoods });
  } catch (error) {
    next(error);
  }
};

export const getFoodByIdController = async (req, res, next) => {
  try {
    const food = await getFoodByIdService(req.params.id);
    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json({
      food,
    });
  } catch (error) {
    next(error);
  }
};

export const searchFoodController = async (req, res, next) => {
  try {
    const { name, category, location, status } = req.query;

    const food = await searchFoodService(name, category, location, status);

    res.status(200).json({
      food,
    });
  } catch (error) {
    next(error);
  }
};
