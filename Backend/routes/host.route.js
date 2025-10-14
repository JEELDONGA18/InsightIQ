import { Router } from "express";
import company from "../controller/company.controller.js";
import { admin } from "../controller/admin.controller.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/admin.js";
import { getmonthwiseTransaction, getyearwiseTransaction } from "../controller/Transaction.controller.js";

const adminRoute = Router();

adminRoute.post("/company", company);
adminRoute.get("/adminpage", auth, admin);
adminRoute.get("/monthwisetransaction", auth, isAdmin, getmonthwiseTransaction);
adminRoute.get("/yearwisetransaction", auth, isAdmin, getyearwiseTransaction);

export default adminRoute;
