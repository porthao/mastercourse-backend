import { NextFunction, Request, Response } from "express";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.name)
    return res
      .status(400)
      .json({ success: false, message: "name must required!" });

  next();
};
