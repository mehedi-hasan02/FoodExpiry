import cron from "node-cron";
import { sendExpiryReminderMail } from "../services/mail.service.js";
import { foodNeedToReminder } from "../services/food.service.js";

const groupFoodsByUser = (foods) => {
  const groupedFoods = {};

  for (const food of foods) {
    const { user } = food;

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

export const startExpiryReminderJob = () => {
  cron.schedule("0 8 * * *", async () => {
    try {
      const foods = await foodNeedToReminder();

      const groupedFoods = groupFoodsByUser(foods);

      for (const user of groupedFoods) {
        await sendExpiryReminderMail(user.email, user.name, user.foods);
      }
    } catch (error) {
      console.error(error);
    }
  });
};
