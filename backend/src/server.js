import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/dbConnect.js";
import startCronJobs from "./config/cron.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

startCronJobs();

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
