import { authResolver } from "../modules/auth/graphql/auth.resolver";
import { postResolver } from "../modules/post/graphql/post.resolver";
import { userResolver } from "../modules/user/graphql/user.resolver";

export const resolvers = {
  Query: {
    ...userResolver.Query,
    ...postResolver.Query,
  },
  Mutation: {
    ...postResolver.Mutation,
    ...authResolver.Mutation,
  },
};
