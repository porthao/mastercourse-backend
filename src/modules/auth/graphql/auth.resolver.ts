import { loginService, registerService } from "../services/auth.services";
import { LoginDto, RegisterDto } from "../types/auth.types";

export const authResolver = {
  Mutation: {
    login: async (_: any, { data }: { data: LoginDto }) => {
      console.log({ data });
      const _res = await loginService(data);
      return _res;
    },
    register: async (_: any, { data }: { data: RegisterDto }) => {
      const _res = await registerService(data);
      return _res;
    },
  },
};
