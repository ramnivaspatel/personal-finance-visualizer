import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false, // initially optional, Stage 2 will use it
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development
export const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
