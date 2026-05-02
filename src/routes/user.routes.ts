import {
  deleteUser,
  updateUser,
  updateUserByAllKeys,
} from "./../controllers/user.controllers";
import { Router } from "express";
import {
  addNewUser,
  findUser,
  getUserById,
  getUsers,
} from "../controllers/user.controllers";
import { validateCreateUser } from "../validations/user.validations";

export const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/search", findUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", validateCreateUser, addNewUser);
userRouter.put("/:id", updateUserByAllKeys);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
