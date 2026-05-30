import { Request } from "express";
import jwt from "jsonwebtoken";
import { JwtPayloadDto } from "../modules/auth/types/auth.types";

export interface GraphqlContext {
  user?: JwtPayloadDto;
}

export const createContext = async ({
  req,
}: {
  req: Request;
}): Promise<GraphqlContext> => {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) return {};

  try {
    const token = auth.split("Bearer ")[1];
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
    ) as JwtPayloadDto;
    return { user };
  } catch (error) {
    return {};
  }
};
