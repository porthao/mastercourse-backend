import { AppDataSource } from "../../../db/data-source";
import { responseError, responseSuccessOne } from "../../../utils/responses";
import { User } from "../../user/entities/user.entity";
import { JwtPayloadDto, LoginDto, RegisterDto } from "../types/auth.types";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);
const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

export const registerService = async (data: RegisterDto) => {
  // 1. Validation
  if (!data.name || !data.email || !data.password) {
    return responseError("Bad request!");
  }

  // 2. Hash password
  const passwordHash = await argon2.hash(data.password);

  data.password = passwordHash;

  //   3. Insert to DB
  const user = userRepository.create(data);
  const registerData = await userRepository.save(user);
  //   4. Return data
  return responseSuccessOne("Register success", {
    ...registerData,
    password: undefined,
  });
};

export const loginService = async (data: LoginDto) => {
  // 1. validation
  if (!data.email || !data.password) return responseError("Bad request!");

  // 2. find user data
  const user = await userRepository.findOneBy({ email: data.email });

  //   3. Check user exist
  if (!user) return responseError("Email or password invlid");

  //   4.Compare password
  const isPasswordMatch = await argon2.verify(user.password, data.password);
  if (!isPasswordMatch) return responseError("Email or password invalid");

  //   5. Generate token
  const jwtPayload: JwtPayloadDto = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, jwtSecretKey, {
    expiresIn: "1d",
  });

  //   6. return data
  return responseSuccessOne("Login success", {
    accessToken: token,
    user: { ...user, password: undefined },
  });
};
