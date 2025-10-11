import { Router } from "express";
import company from "../controller/company.controller.js";
import { admin } from "../controller/admin.controller.js";
import { auth } from "../middleware/auth.js";

const adminRoute = Router();

adminRoute.post("/company", company);
adminRoute.get("/adminpage", auth, admin);

export default adminRoute;
