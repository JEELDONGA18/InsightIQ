import { Router } from "express";
import company from "../controller/company.controller.js";
import { admin } from "../controller/admin.controller.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/admin.js";
import {
  addTransaction,
  getAllDepartmentTransactions,
  getCurrentYearSummary,
  getDepartmentFinanceInsights,
  getDepartmentReport,
  getDepartmentTransactions,
  getDepartmentYearTotals,
  getMonthwiseIncomeExpense,
  getmonthwiseTransaction,
  getMonthYear,
  getyearwiseTransaction,
} from "../controller/Transaction.controller.js";
import {
  deleteDepartment,
  editDepartment,
} from "../controller/department.controller.js";

const adminRoute = Router();

adminRoute.post("/company", company);
adminRoute.get("/adminpage", auth, admin);
adminRoute.put("/editDepartment/:id", auth, isAdmin, editDepartment);
adminRoute.get("/currentYearSummary", auth, getCurrentYearSummary);
adminRoute.get("/monthwiseIncomeExpense", auth, getMonthwiseIncomeExpense);
adminRoute.get("/departmentPerformance", auth, getAllDepartmentTransactions);
adminRoute.get("/departmentYearTotals", auth, getDepartmentYearTotals);
adminRoute.delete("/deleteDepartment/:id", auth, isAdmin, deleteDepartment);
adminRoute.get("/MonthYear", auth, isAdmin, getMonthYear);
adminRoute.post("/addTransaction", auth, addTransaction);
adminRoute.get(
  "/department/:id/finance-insights",
  auth,
  getDepartmentFinanceInsights
);
adminRoute.get("/department/:id/transactions", auth, getDepartmentTransactions);
adminRoute.get("/department/:id/report", getDepartmentReport);
adminRoute.get("/monthwisetransaction", auth, isAdmin, getmonthwiseTransaction);
adminRoute.get("/yearwisetransaction", auth, isAdmin, getyearwiseTransaction);

export default adminRoute;
