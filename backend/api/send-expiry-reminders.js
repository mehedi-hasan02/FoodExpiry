import { foodNeedToReminder } from "../src/services/food.service.js";
import { sendExpiryReminderMail } from "../src/services/mail.service.js";

const groupFoodsByUser = (foods) => {
  const groupedFoods = {};

  for (const food of foods) {
    const { user } = food;

    if (!user?.email) {
      continue;
    }

    if (!groupedFoods[user.email]) {
      groupedFoods[user.email] = {
        name: user.name,
        email: user.email,
        foods: [],
      };
    }

    groupedFoods[user.email].foods.push({
      id: food._id,
      name: food.name,
      category: food.category,
      quantity: food.quantity,
      unit: food.unit,
      expiryDate: food.expiryDate,
      status: food.status,
    });
  }

  return Object.values(groupedFoods);
};

export default async function handler(req, res) {
  // Verify Vercel Cron
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end("Unauthorized");
  }

  try {
    console.log("Expiry reminder cron started");

    const foods = await foodNeedToReminder();

    console.log(`Foods found: ${foods.length}`);

    const groupedFoods = groupFoodsByUser(foods);

    console.log(`Users to notify: ${groupedFoods.length}`);

    for (const user of groupedFoods) {
      console.log(`Sending email to: ${user.email}`);

      await sendExpiryReminderMail(user.email, user.name, user.foods);
    }

    console.log("Expiry reminder cron completed");

    return res.status(200).json({
      ok: true,
      usersNotified: groupedFoods.length,
      foodsFound: foods.length,
    });
  } catch (error) {
    console.error("Expiry reminder job failed:", error);

    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
}
