import { Router } from "express";
import company from "../controller/company.controller.js";

const adminRoute = Router();

adminRoute.post("/company", company);

export default adminRoute;