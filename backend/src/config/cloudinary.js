import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import { Readable } from "stream";

dotenv.config();

// cloudinary.config({
//   cloud_name: "paxnw6hp",
//   api_key: process.env.CLOUDINARY_CLOUD_API,
//   api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
// });

// const uploadOnCloudinary = async (filePath) => {
//   try {
//     if (!filePath) {
//       return null;
//     }

//     const result = await cloudinary.uploader.upload(filePath);

//     fs.unlinkSync(filePath);

//     return result.url;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default uploadOnCloudinary;

cloudinary.config({
  cloud_name: "paxnw6hp",
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadOnCloudinary = async (buffer) => {
  if (!buffer) {
    return null;
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "foodexpiry",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.log("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      uploadStream.end(buffer);
    });

    return result.secure_url;
  } catch (error) {
    console.log("Cloudinary error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;
