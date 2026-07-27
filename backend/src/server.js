import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/dbConnect.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`Server running at port${port}`);
});
