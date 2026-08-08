import app from "../src/app.js";
import connectDB from "../src/config/dbConnect.js";

await connectDB();

export default app;
