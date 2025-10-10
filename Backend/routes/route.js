import { Router } from "express";
import { loginController } from "../controller/login.controller.js";

const route = Router();

route.post("/", loginController);

export default route;
