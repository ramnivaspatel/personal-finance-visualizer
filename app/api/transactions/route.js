import { Transaction } from "../../../models/transaction";
import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// POST: Add a new transaction
export const POST = async (req, res) => {
  try {
    await connectDB();
    const { amount, date, description, category } = await req.json();

    const newTransaction = new Transaction({
      amount,
      date,
      description,
      category,
    });

    await newTransaction.save();
    return res.status(201).json(newTransaction);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET: Get all transactions
export const GET = async (req, res) => {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// PUT: Update a transaction
export const PUT = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.query;
    const { amount, date, description, category } = await req.json();

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json(updatedTransaction);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE: Delete a transaction
export const DELETE = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.query;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
