import { AppDataSource } from "../../../db/data-source";
import { responseError, responseSuccessOne } from "../../../utils/responses";
import { User } from "../entities/user.entity";
import { createUserDto } from "../types/user.types";

const userRepository = AppDataSource.getRepository(User);

export const createUserService = async (data: createUserDto) => {
  if (!data.name || !data.email || !data.password) {
    return responseError("Bad request!");
  }

  const user = userRepository.create(data);
  const newData = await userRepository.save(user);

  return responseSuccessOne("Create user success", newData);
};
