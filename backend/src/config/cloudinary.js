import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: "paxnw6hp",
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }

    const result = await cloudinary.uploader.upload(filePath);

    fs.unlinkSync(filePath);

    return result.url;
  } catch (error) {
    console.log(error);
  }
};

export default uploadOnCloudinary;
