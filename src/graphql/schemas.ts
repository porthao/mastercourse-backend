import { authSchema } from "../modules/auth/graphql/auth.schem";
import { postSchema } from "../modules/post/graphql/post.schema";
import { userSchema } from "../modules/user/graphql/user.schema";

export const schemas = `#graphql
scalar Date

type PaginationMeta {
  total: Int!
  page: Int!
  limit: Int!
  totalPages: Int
}

${authSchema}
${userSchema}
${postSchema}
`;
