import { Router } from "express";
import { loginController } from "../controller/login.controller.js";
import { auth } from "../middleware/auth.js";
import department from "../controller/department.controller.js";
import isAdmin from "../middleware/admin.js";
import addUser from "../controller/addUser.controller.js";
import addDepartment from "../controller/addDepartment.controller.js";
import transaction from "../controller/addTransaction.controller.js";

const route = Router();

route.post("/login", loginController);
route.post("/addUser", auth, isAdmin, addUser);
route.post("/addDepartment", auth, isAdmin, addDepartment);
route.get("/department", auth, department);
route.post("/addTransaction", auth, transaction);

export default route;
