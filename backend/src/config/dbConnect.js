import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q9ntuh2.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`;

    const connection = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
