import { Request, Response } from "express";
import { createUserService } from "../services/user.services";

export const createUserController = async (req: Request, res: Response) => {
  const body = req.body;
  const saveData = await createUserService(body);
  res.status(!saveData.success ? 400 : 201).json(saveData);
};
