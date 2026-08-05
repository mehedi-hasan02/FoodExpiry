import express, { Router } from "express";
import {
  addFamilyMemberController,
  createFamilyController,
  getFamilyController,
  getFamilyOwnerController,
  removeMemberController,
} from "../controllers/family.controller.js";
import { validateFamilyData } from "../validators/family.validator.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const familyRoute = Router();

familyRoute.post(
  "/family",
  authMiddleWare,
  validateFamilyData,
  createFamilyController,
);
familyRoute.post("/family/member", authMiddleWare, addFamilyMemberController);

familyRoute.get("/family", authMiddleWare, getFamilyController);

familyRoute.get("/family/owner", authMiddleWare, getFamilyOwnerController);

familyRoute.delete(
  "/family/member/:memberId",
  authMiddleWare,
  removeMemberController,
);

export default familyRoute;
