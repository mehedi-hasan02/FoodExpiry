import express, { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";

const authRoute = express(Router());

authRoute.post("/signup", signUp);

export default authRoute;
