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
  try {
    if (!buffer) {
      return null;
    }

    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "foodexpiry",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        },
      );

      Readable.from(buffer).pipe(stream);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default uploadOnCloudinary;
