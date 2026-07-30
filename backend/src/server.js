import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/dbConnect.js";
import authRoute from "./routes/auth.route.js";
import errorHandler from "./middleware/error.middleware.js";
import foodRoute from "./routes/food.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({ status: true });
});

app.use("/", authRoute);
app.use("/", foodRoute);
app.use("/user", userRoute);
app.use(errorHandler);

connectDB();

app.listen(port, () => {
  console.log(`Server running at port${port}`);
});
