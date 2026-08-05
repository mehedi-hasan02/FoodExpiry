import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["Owner", "Member"],
      default: "Member",
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

const familySchema = new mongoose.Schema(
  {
    familyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: {
      type: [memberSchema],
      default: [],
    },

    familyImage: {
      type: String,
      default: "",
    },

    // inviteCode: {
    //   type: String,
    //   unique: true,
    //   required: true,
    // },

    isActive: {
      type: Boolean,
      default: true,
    },

    maxMembers: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  },
);

const Family = mongoose.model("Family", familySchema);

export default Family;
