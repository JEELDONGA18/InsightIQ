import asynchandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import Transaction from "../model/transaction.model.js";
import { User } from "../model/user.model.js";

export const addTransaction = asynchandler(async (req, res) => {
  const user = req.user;
  const { department, amount, type, description } = req.body;

  const date = req.body.date || new Date();

  if (!department || !amount || !type) {
    return res
      .status(400)
      .json({ message: "Amount or type or description is missing." });
  }

  // const userDepartment = await User.findById(user).select("department");

  // if (!userDepartment || !userDepartment.department) {
  //   return res.status(404).json({ message: "User's department not found." });
  // }

  // Create transaction
  const trans = await Transaction.create({
    department: department,
    amount,
    type,
    date,
    description,
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

export const getDepartmentFinanceInsights = asynchandler(async (req, res) => {
  const { id } = req.params;
  const { month, year } = req.query;

  if (!id || !month || !year) {
    return res
      .status(400)
      .json({ message: "Department id, month, and year required." });
  }

  // Validate department exists
  const department = await Department.findById(id);
  if (!department) {
    return res.status(404).json({ message: "Department not found." });
  }

  // Get start/end dates for selected month/year
  const start = new Date(year, month, 1);
  const end = new Date(year, Number(month) + 1, 1);

  // Get all transactions for department in month/year
  const transactions = await Transaction.find({
    department: id,
    date: { $gte: start, $lt: end },
  }).lean();

  // Aggregate totals
  let totalIncome = 0,
    totalExpense = 0;
  const daysInMonth = new Date(year, Number(month) + 1, 0).getDate();
  const dayWiseIncome = Array(daysInMonth).fill(0);
  const dayWiseExpense = Array(daysInMonth).fill(0);

  transactions.forEach((tx) => {
    const day = new Date(tx.date).getDate() - 1; // 0-based index
    if (tx.type === "income") {
      totalIncome += tx.amount;
      dayWiseIncome[day] += tx.amount;
    } else if (tx.type === "expense") {
      totalExpense += tx.amount;
      dayWiseExpense[day] += tx.amount;
    }
  });

  res.json({
    department: { id: department._id, name: department.name },
    month,
    year,
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
    dayWiseIncome,
    dayWiseExpense,
    days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
  });
});

export const getDepartmentTransactions = asynchandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Department id required." });

  // Optionally, filter by month/year if you want
  const { month, year } = req.query;
  let filter = { department: id };
  if (month && year) {
    const start = new Date(year, month, 1);
    const end = new Date(year, Number(month) + 1, 1);
    filter.date = { $gte: start, $lt: end };
  }

  const transactions = await Transaction.find(filter).sort({ date: -1 }).lean();

  res.json({
    transactions: transactions.map((tx) => ({
      _id: tx._id,
      type: tx.type,
      amount: tx.amount,
      description: tx.description,
      date: tx.date,
    })),
  });
});

// GET /api/host/department/:id/report?month=MM&year=YYYY
export const getDepartmentReport = asynchandler(async (req, res) => {
  const { id } = req.params;
  const { month, year } = req.query;

  if (!id || !month || !year) {
    return res
      .status(400)
      .json({ message: "Department id, month, and year required." });
  }

  const department = await Department.findById(id);
  if (!department) {
    return res.status(404).json({ message: "Department not found." });
  }

  // Date range for the month
  const start = new Date(year, month, 1);
  const end = new Date(year, Number(month) + 1, 1);

  // Fetch transactions for this department and month
  const transactions = await Transaction.find({
    department: id,
    date: { $gte: start, $lt: end },
  }).lean();

  // Summary calculations
  let totalIncome = 0,
    totalExpense = 0;
  const dayCount = new Date(year, Number(month) + 1, 0).getDate();
  const dayWiseIncome = Array(dayCount).fill(0);
  const dayWiseExpense = Array(dayCount).fill(0);

  transactions.forEach((tx) => {
    const day = new Date(tx.date).getDate() - 1;
    if (tx.type === "income") {
      totalIncome += tx.amount;
      dayWiseIncome[day] += tx.amount;
    } else if (tx.type === "expense") {
      totalExpense += tx.amount;
      dayWiseExpense[day] += tx.amount;
    }
  });

  // Performance: Net profit per day
  const dayWiseNet = dayWiseIncome.map((inc, i) => inc - dayWiseExpense[i]);

  res.json({
    department: {
      id: department._id,
      name: department.name,
    },
    summaryCards: [
      { title: "Total Income", value: `₹${totalIncome}` },
      { title: "Total Expense", value: `₹${totalExpense}` },
      { title: "Net Profit", value: `₹${totalIncome - totalExpense}` },
      { title: "Transactions", value: transactions.length },
    ],
    performance: {
      labels: Array.from({ length: dayCount }, (_, i) => `Day ${i + 1}`),
      data: dayWiseNet,
    },
    transactions: transactions.map((tx) => ({
      date: tx.date,
      type: tx.type,
      amount: tx.amount,
      description: tx.description || "",
    })),
    month,
    year,
  });
});
