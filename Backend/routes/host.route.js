import { Router } from "express";
import company from "../controller/company.controller.js";
import { admin } from "../controller/admin.controller.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/admin.js";
import {
  getAllDepartmentTransactions,
  getCurrentYearSummary,
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
import { getAllEmployeesByCompany } from "../controller/getEmployee.controller.js";

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
adminRoute.get("/monthwisetransaction", auth, isAdmin, getmonthwiseTransaction);
adminRoute.get("/yearwisetransaction", auth, isAdmin, getyearwiseTransaction);
adminRoute.get("/getEmployee", auth, isAdmin, getAllEmployeesByCompany)

export default adminRoute;
