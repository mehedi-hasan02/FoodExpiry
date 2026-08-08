import {
  addFamilyMemberService,
  createFamilyService,
  getFamilyOwnerService,
  getFamilyService,
  removeMemberService,
} from "../services/family.service.js";

export const createFamilyController = async (req, res, next) => {
  try {
    const family = await createFamilyService({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Successfully created your family group.",
      family,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addFamilyMemberController = async (req, res, next) => {
  try {
    const member = await addFamilyMemberService(req.body, req.user.id);

    res.status(200).json({
      success: true,
      message: "Member successfully added",
      member,
    });
  } catch (error) {
    next(error);
  }
};

export const getFamilyController = async (req, res, next) => {
  try {
    const family = await getFamilyService({
      id: req.user.id,
    });

    if (!family) {
      return res.status(400).json({
        success: false,
        message: "No Family Data",
      });
    }

    res.status(200).json({
      success: true,
      family,
    });
  } catch (error) {
    next(error);
  }
};

export const getFamilyOwnerController = async (req, res, next) => {
  try {
    const owner = await getFamilyOwnerService(req.user.id);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    res.status(200).json({
      success: true,
      owner,
    });
  } catch (error) {
    next(error);
  }
};

export const removeMemberController = async (req, res, next) => {
  try {
    const { memberId } = req.params;

    const family = await removeMemberService(req.user.id, memberId);

    res.status(200).json({
      success: true,
      message: "Member removed successfully",
      family,
    });
  } catch (error) {
    next(error);
  }
};
