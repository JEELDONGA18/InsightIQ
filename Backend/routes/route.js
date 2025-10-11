import { Router } from "express";
import { loginController } from "../controller/login.controller.js";
import auth from "../middleware/auth.js";
import department from "../controller/department.controller.js";

const route = Router();

route.post("/", loginController);
route.get("/department", auth, department);

export default route;
