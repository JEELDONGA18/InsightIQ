import { Router } from "express";
import { checkAuthUser, loginController, logOut } from "../controller/login.controller.js";
import auth from "../middleware/auth.js";
import department from "../controller/department.controller.js";
import isAdmin from "../middleware/admin.js";
import addUser from "../controller/addUser.controller.js";
import addDepartment from "../controller/addDepartment.controller.js";
import { addTransaction } from "../controller/Transaction.controller.js";
import { getDepartmentName } from "../controller/getDepartment.controller.js";

const route = Router();

route.post("/login", loginController);
route.post("/addUser", auth, isAdmin, addUser);
route.post("/addDepartment", auth, isAdmin, addDepartment);
route.post("/addTransaction", auth, addTransaction);
route.get("/getDepartment", auth, getDepartmentName);
route.get("/check-auth", auth, checkAuthUser);
route.get("/department", auth, department);
route.get("/logout", auth, logOut)

export default route;
