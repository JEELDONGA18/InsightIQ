import asynchandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import Transaction from "../model/transaction.model.js";
import { User } from "../model/user.model.js";

export const addTransaction = asynchandler(async (req, res) => {
  const user = req.user;
  const { amount, type } = req.body;

  const date = req.body.date || new Date();

  if (!amount || !type) {
    return res.status(400).json({ message: "Amount or type is missing." });
  }

  const userDepartment = await User.findById(user).select("department");

  if (!userDepartment || !userDepartment.department) {
    return res.status(404).json({ message: "User's department not found." });
  }

  // Create transaction
  const trans = await Transaction.create({
    department: userDepartment.department,
    amount,
    type,
    date,
  });

  return res.status(200).json({
    message: "Transaction added successfully",
    trans,
  });
});

export const getmonthwiseTransaction = asynchandler(async (req, res) => {
  const userId = req.user.userId || req.user._id || req.user;

  // 1. Find the user's company
  const user = await User.findById(userId).select("company");
  if (!user || !user.company) {
    return res.status(404).json({ message: "User's company not found." });
  }
  console.log("user", user);
  // 2. Find all departments in that company
  const departments = await Department.find({ company: user.company }).select(
    "_id name"
  );
  const departmentIds = departments.map((dep) => dep._id);
  console.log("Department IDs:", departmentIds);
  // 3. Aggregation: Group transactions by month and department
  const transactions = await Transaction.aggregate([
    {
      $match: {
        department: { $in: departmentIds },
      },
    },
    {
      $addFields: {
        month: { $month: "$date" },
        year: { $year: "$date" },
      },
    },
    {
      $group: {
        _id: {
          department: "$department",
          month: "$month",
          year: "$year",
        },
        totalAmount: { $sum: "$amount" },
        transactions: { $push: "$$ROOT" },
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "_id.department",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $unwind: "$department",
    },
    {
      $project: {
        _id: 0,
        department: "$department.name",
        month: "$_id.month",
        year: "$_id.year",
        totalAmount: 1,
        transactions: 1,
      },
    },
    {
      $sort: { year: -1, month: -1, department: 1 },
    },
  ]);

  return res.status(200).json({ transactions });
});

export const getyearwiseTransaction = asynchandler(async (req, res) => {
  const userId = req.user;

  // 1. Find the user's company
  const user = await User.findById(userId).select("company");
  if (!user || !user.company) {
    return res.status(404).json({ message: "User's company not found." });
  }

  // 2. Find all departments in that company
  const departments = await Department.find({ company: user.company }).select(
    "_id name"
  );
  const departmentIds = departments.map((dep) => dep._id);

  // 3. Aggregation: Group transactions by year and department
  const transactions = await Transaction.aggregate([
    {
      $match: {
        department: { $in: departmentIds },
      },
    },
    {
      $addFields: {
        year: { $year: "$date" },
      },
    },
    {
      $group: {
        _id: {
          department: "$department",
          year: "$year",
        },
        totalAmount: { $sum: "$amount" },
        transactions: { $push: "$$ROOT" },
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "_id.department",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $unwind: "$department",
    },
    {
      $project: {
        _id: 0,
        department: "$department.name",
        year: "$_id.year",
        totalAmount: 1,
        transactions: 1,
      },
    },
    {
      $sort: { year: -1, department: 1 },
    },
  ]);

  return res.status(200).json({ transactions });
});
