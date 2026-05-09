import { NextFunction, Request, Response } from "express";
import { responseError } from "../../utils/responses";
import jwt from "jsonwebtoken";
import { JwtPayloadDto } from "../auth/types/auth.types";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadDto;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization?.includes("Bearer ")) {
    return res.status(401).json(responseError("Unauthorized"));
  }

  const token = req.headers.authorization.split("Bearer ")[1];

  try {
    const user = jwt.verify(token, jwtSecretKey);
    req.user = user as JwtPayloadDto;
    next();
  } catch (error: any) {
    return res.status(401).json(responseError(error?.message));
  }
};

export const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json(responseError("Forbidden"));
      return;
    }
    next();
  };
