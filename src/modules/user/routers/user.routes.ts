import { Router } from "express";
import { createUserController } from "../controllers/user.controllers";

export const userRouter = Router();

userRouter.post("/", createUserController);
