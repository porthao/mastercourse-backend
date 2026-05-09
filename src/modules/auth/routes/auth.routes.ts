import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controllers";

export const authRouters = Router();

authRouters.post("/register", registerController);
authRouters.post("/login", loginController);
