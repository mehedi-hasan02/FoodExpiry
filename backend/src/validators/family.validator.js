export const validateFamilyData = async (req, res, next) => {
  const { familyName } = req.body;

  // console.log(familyName);

  if (!familyName) {
    return res.status(400).json({
      success: false,
      message: "Family name is required",
    });
  }

  if (familyName.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Family name must be at least 3 characters",
    });
  }

  if (familyName.trim().length > 50) {
    return res.status(400).json({
      success: false,
      message: "Family name cannot exceed 50 characters",
    });
  }

  req.body.familyName = familyName.trim();

  next();
};
