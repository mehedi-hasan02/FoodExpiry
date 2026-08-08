import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // Reuse existing connection
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    const uri = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
      process.env.DB_PASS,
    )}@cluster0.q9ntuh2.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`;

    const connection = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${connection.connection.host}`);

    return connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
