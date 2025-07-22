import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import AffiliateStat from "../models/AffiliateStat.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: { path: "$affiliateStats", preserveNullAndEmptyArrays: true } }, // Important!
    ]);

    if (!userWithStats || !userWithStats[0]) {
      return res.status(404).json({ message: "User not found or no affiliate stats" });
    }

    const affiliateSales = userWithStats[0]?.affiliateStats?.affiliateSales || [];
    const saleTransactions = await Promise.all(
      affiliateSales.map((saleId) => Transaction.findById(saleId))
    );

    const filteredSaleTransactions = saleTransactions.filter(txn => txn !== null);

    res.status(200).json({
      user: userWithStats[0],
      sales: filteredSaleTransactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
