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

export const getCurrentYearSummary = asynchandler(async (req, res) => {
  const userId = req.user;

  // Find user's company
  const user = await User.findById(userId).select("company");
  if (!user || !user.company) {
    return res.status(404).json({ message: "User's company not found." });
  }

  // Find all departments in that company
  const departments = await Department.find({ company: user.company }).select(
    "_id"
  );
  const departmentIds = departments.map((dep) => dep._id);

  // Get current year
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  // Aggregate income and expense for current year
  const summary = await Transaction.aggregate([
    {
      $match: {
        department: { $in: departmentIds },
        date: { $gte: start, $lt: end },
      },
    },
    {
      $group: {
        _id: "$type", // "income" or "expense"
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0,
    expense = 0;
  summary.forEach((item) => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  const total = income - expense;

  res.json({ income, expense, total });
});

export const getMonthwiseIncomeExpense = asynchandler(async (req, res) => {
  const userId = req.user;

  // Find user's company
  const user = await User.findById(userId).select("company");
  if (!user || !user.company) {
    return res.status(404).json({ message: "User's company not found." });
  }

  // Find all departments in that company
  const departments = await Department.find({ company: user.company }).select(
    "_id"
  );
  const departmentIds = departments.map((dep) => dep._id);

  // Get current year
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  // Aggregate month-wise income and expense
  const summary = await Transaction.aggregate([
    {
      $match: {
        department: { $in: departmentIds },
        date: { $gte: start, $lt: end },
      },
    },
    {
      $addFields: {
        month: { $month: "$date" },
      },
    },
    {
      $group: {
        _id: { month: "$month", type: "$type" },
        total: { $sum: "$amount" },
      },
    },
  ]);

  // Prepare data for all months (Jan to current)
  const months = Array.from({ length: now.getMonth() + 1 }, (_, i) => i + 1);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const result = months.map((m) => {
    const incomeObj = summary.find(
      (s) => s._id.month === m && s._id.type === "income"
    );
    const expenseObj = summary.find(
      (s) => s._id.month === m && s._id.type === "expense"
    );
    const income = incomeObj ? incomeObj.total : 0;
    const expense = expenseObj ? expenseObj.total : 0;
    return {
      month: monthNames[m - 1],
      income,
      expense,
      total: income - expense,
    };
  });

  res.json({
    months: result.map((r) => r.month),
    income: result.map((r) => r.income),
    expense: result.map((r) => r.expense),
    total: result.map((r) => r.total),
  });
});

export const getAllDepartmentTransactions = asynchandler(async (req, res) => {
  const userId = req.user.userId || req.user._id || req.user;

  // Find user's company
  const user = await User.findById(userId).select("company");
  if (!user || !user.company) {
    return res.status(404).json({ message: "User's company not found." });
  }

  // Find all departments in that company
  const departments = await Department.find({ company: user.company }).select(
    "_id name"
  );
  const departmentMap = {};
  departments.forEach((dep) => {
    departmentMap[dep._id.toString()] = dep.name;
  });
  const departmentIds = departments.map((dep) => dep._id);

  // Get all transactions for these departments
  const transactions = await Transaction.find({
    department: { $in: departmentIds },
  })
    .sort({ date: -1 })
    .lean();

  // Map department name and format income/expense/total per transaction
  const result = transactions.map((tx) => ({
    departmentName: departmentMap[tx.department.toString()] || "Unknown",
    income: tx.type === "income" ? tx.amount : 0,
    expense: tx.type === "expense" ? tx.amount : 0,
    total: tx.type === "income" ? tx.amount : -tx.amount,
    date: tx.date,
    type: tx.type,
    amount: tx.amount,
  }));

  res.json({ transactions: result });
});

export const getMonthYear = asynchandler(async (req, res) => {
  const userId = req.user.userId || req.user._id || req.user;
  const { month, year } = req.query;

  // Validate month and year
  if (!month || !year) {
    return res.status(400).json({ message: "Month and year are required." });
  }

  // Find user's company
  const user = await User.findById(userId).select("company");
  if (!user || !user.company) {
    return res.status(404).json({ message: "User's company not found." });
  }

  // Find all departments in that company
  const departments = await Department.find({ company: user.company }).select(
    "_id"
  );
  const departmentIds = departments.map((dep) => dep._id);

  // Calculate date range for the selected month and year
  const start = new Date(year, month, 1);
  const end = new Date(year, Number(month) + 1, 1);

  // Aggregate income and expense for the selected month
  const summary = await Transaction.aggregate([
    {
      $match: {
        department: { $in: departmentIds },
        date: { $gte: start, $lt: end },
      },
    },
    {
      $group: {
        _id: "$type", // "income" or "expense"
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0,
    expense = 0;
  summary.forEach((item) => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  res.json({
    labels: ["Income", "Expense"],
    data: [income, expense],
  });
});



export const getDepartmentYearTotals = asynchandler(async (req, res) => {
  const userId = req.user.userId || req.user._id || req.user;

  // 1. Find user's company
  const user = await User.findById(userId).select("company");
  if (!user || !user.company) {
    return res.status(404).json({ message: "User's company not found." });
  }

  // 2. Get departments for the company
  const departments = await Department.find({ company: user.company }).select(
    "_id name"
  );
  const deptIds = departments.map((d) => d._id);

  // 3. Date range for current year
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  // 4. Aggregate income/expense per department for current year
  const agg = await Transaction.aggregate([
    {
      $match: {
        department: { $in: deptIds },
        date: { $gte: start, $lt: end },
      },
    },
    {
      $group: {
        _id: { department: "$department", type: "$type" },
        total: { $sum: "$amount" },
      },
    },
  ]);

  // 5. Build a map with all departments included (0 where no data)
  const map = {};
  departments.forEach((d) => {
    map[d._id.toString()] = { name: d.name, income: 0, expense: 0 };
  });

  agg.forEach((item) => {
    const id = item._id.department.toString();
    if (!map[id]) return;
    if (item._id.type === "income") map[id].income = item.total;
    if (item._id.type === "expense") map[id].expense = item.total;
  });

  const rows = Object.values(map).map((d) => ({
    name: d.name,
    income: d.income,
    expense: d.expense,
    total: d.income - d.expense,
  }));

  // 6. Return arrays ready for frontend charts/tables
  res.json({
    departments: rows.map((r) => r.name),
    income: rows.map((r) => r.income),
    expense: rows.map((r) => r.expense),
    total: rows.map((r) => r.total),
    rows,
  });
});
