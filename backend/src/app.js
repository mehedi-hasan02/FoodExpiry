import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  }),
);

export default app;
