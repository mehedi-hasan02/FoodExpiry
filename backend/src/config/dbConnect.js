import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fvwg0tw.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q9ntuh2.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${process.env.DB_NAME}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
