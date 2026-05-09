import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controllers";
import { authenticate, authorize } from "../../middlewares/auth.middlewares";

export const userRouter = Router();

userRouter.post("/", authenticate, authorize("admin"), createUserController);

userRouter.get("/", authenticate, getUsersController);
userRouter.get("/:id", authenticate, authorize("admin"), getUserByIdController);
userRouter.patch("/:id", updateUserController);
userRouter.delete("/:id", deleteUserController);
