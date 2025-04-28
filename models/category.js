import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development
export const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
