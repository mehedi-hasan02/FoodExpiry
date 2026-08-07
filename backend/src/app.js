import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import foodRoute from "./routes/food.route.js";
import familyRoute from "./routes/family.route.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
  Boolean,
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", foodRoute);
app.use("/", familyRoute);

// Root
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FoodExpiry API is running",
  });
});

// Error handler
app.use(errorHandler);

export default app;
