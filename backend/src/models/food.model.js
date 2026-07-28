import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Fruits",
        "Vegetables",
        "Dairy",
        "Meat",
        "Seafood",
        "Beverages",
        "Bakery",
        "Snacks",
        "Frozen",
        "Other",
      ],
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "L", "ml", "pcs", "pack", "box"],
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      enum: ["Fridge", "Freezer", "Pantry", "Kitchen", "Other"],
      default: "Kitchen",
    },

    status: {
      type: String,
      enum: ["Fresh", "Expiring Soon", "Expired"],
      default: "Fresh",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
