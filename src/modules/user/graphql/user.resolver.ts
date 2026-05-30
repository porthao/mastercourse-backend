import { createContext, GraphqlContext } from "./../../../graphql/context";
import { getUserByIdService } from "../services/user.services";
import { responseError } from "../../../utils/responses";

export const userResolver = {
  Query: {
    user: async (_: any, { id }: { id: number }, context: GraphqlContext) => {
      if (!context.user?.id) return responseError("Unauthorized");
      const _res = await getUserByIdService(id);
      return _res;
    },
  },
};
