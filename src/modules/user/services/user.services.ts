import { AppDataSource } from "../../../db/data-source";
import {
  responseError,
  responseSuccessMany,
  responseSuccessOne,
} from "../../../utils/responses";
import { User } from "../entities/user.entity";
import { createUserDto } from "../types/user.types";

const userRepository = AppDataSource.getRepository(User);

export const createUserService = async (data: createUserDto) => {
  if (!data.name || !data.email || !data.password) {
    return responseError("Bad request!");
  }

  const existingEmail = await userRepository.findOneBy({ email: data.email });
  if (existingEmail)
    return responseError("This email already exsiting in the system");

  const user = userRepository.create(data);
  const newData = await userRepository.save(user);

  return responseSuccessOne("Create user success", newData);
};

interface paginationData {
  page: number;
  limit: number;
}
export const getUsersService = async (data: paginationData) => {
  const page = data.page || 1;
  const limit = data.limit || 10;

  const [users, count] = await userRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { createdAt: "DESC" },
  });

  return responseSuccessMany("Get users success", users, {
    total: count,
    limit: limit,
    page: page,
  });
};

export const getUserByIdService = async (id: number) => {
  const user = await userRepository.findOneBy({ id });

  if (!user) return responseError("User not found");

  return responseSuccessOne("Get user success", user);
};

export const updateUserService = async (id: number, data: createUserDto) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) return responseError("User not found");

  Object.assign(user, data);

  const updateUser = await userRepository.save(user);

  return responseSuccessOne("Update user success", updateUser);
};

export const deleteUserService = async (id: number) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) return responseError("User not found");

  await userRepository.delete(id);

  return responseSuccessOne("Delete user success", user);
};
