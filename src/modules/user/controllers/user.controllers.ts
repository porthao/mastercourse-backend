import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "../services/user.services";

export const createUserController = async (req: Request, res: Response) => {
  const body = req.body;
  const saveData = await createUserService(body);
  res.status(!saveData.success ? 400 : 201).json(saveData);
};

export const getUsersController = async (req: Request, res: Response) => {
  console.log({ userData: req.user });
  const users = await getUsersService({
    page: Number(req.query.page),
    limit: Number(req.query.limit),
  });

  res.status(200).json(users);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const user = await getUserByIdService(Number(req.params.id));

  res.status(!user.success ? 404 : 200).json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const updateUser = await updateUserService(Number(req.params.id), req.body);

  res.status(!updateUser.success ? 404 : 200).json(updateUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const deleleteUser = await deleteUserService(Number(req.params.id));

  res.status(!deleleteUser.success ? 404 : 200).json(deleleteUser);
};
