import { Request, Response } from "express";
import { loginService, registerService } from "../services/auth.services";

export const registerController = async (req: Request, res: Response) => {
  const body = req.body;
  const register = await registerService(body);
  res.status(!register.success ? 400 : 201).json(register);
};

export const loginController = async (req: Request, res: Response) => {
  const body = req.body;
  const _res = await loginService(body);
  const statusCode = !_res.success
    ? _res.message === "Bad request!"
      ? 400
      : 401
    : 200;

  res.status(statusCode).json(_res);
};
