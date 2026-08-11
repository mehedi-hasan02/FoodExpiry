import Food from "../src/models/food.model.js";
import { getAllFoodService } from "../src/services/food.service.js";
import { getExpiryStatus } from "../src/utils/calculateExpiry.js";

const updateFoodExpiryStatus = async (foods) => {
  const bulkUpdates = [];

  for (const food of foods) {
    const newStatus = getExpiryStatus(food.expiryDate);

    if (food.status !== newStatus) {
      bulkUpdates.push({
        updateOne: {
          filter: { _id: food._id },
          update: {
            $set: {
              status: newStatus,
            },
          },
        },
      });
    }
  }

  if (bulkUpdates.length > 0) {
    await Food.bulkWrite(bulkUpdates);
  }

  return bulkUpdates.length;
};

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end("Unauthorized");
  }

  try {
    const foods = await getAllFoodService();

    console.log(`Total foods found: ${foods.length}`);

    const foodsUpdated = await updateFoodExpiryStatus(foods);

    console.log(`Foods updated: ${foodsUpdated}`);

    console.log("Food expiry status update completed");

    return res.status(200).json({
      ok: true,
      foodsFound: foods.length,
      foodsUpdated,
    });
  } catch (error) {
    console.error("Food expiry status update failed:", error);

    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
}
