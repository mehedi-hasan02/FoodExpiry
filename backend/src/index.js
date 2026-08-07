import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/dbConnect.js";

dotenv.config();

connectDB();

export default app;
