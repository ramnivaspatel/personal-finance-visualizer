import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true, // Should store month as "YYYY-MM"
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development
export const Budget =
  mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
