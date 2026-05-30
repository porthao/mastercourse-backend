import { GraphqlContext } from "../../../graphql/context";
import { responseError } from "../../../utils/responses";
import {
  createPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostService,
} from "../services/post.services";
import { CreatePostDto, PostQueryDto } from "../types/post.types";

export const postResolver = {
  Query: {
    posts: async (
      _: any,
      { data }: { data: PostQueryDto },
      context: GraphqlContext,
    ) => {
      if (!context.user?.id) return responseError("Unauthorized");
      const _res = await getAllPostsService(data);
      return _res;
    },
    post: async (_: any, { id }: { id: number }, context: GraphqlContext) => {
      if (!context.user?.id) return responseError("Unauthorized");
      const _res = await getPostByIdService(id);
      return _res;
    },
  },
  Mutation: {
    createPost: async (
      _: any,
      { data }: { data: CreatePostDto },
      context: GraphqlContext,
    ) => {
      if (!context.user?.id) return responseError("Unauthorized");
      data.author_id = Number(context.user.id);
      const _res = await createPostService(data);
      return _res;
    },
    
    updatePost: async (
      _: any,
      { id, data }: { id: number; data: CreatePostDto },
      context: GraphqlContext,
    ) => {
      if (!context.user?.id) return responseError("Unauthorized");
      data.author_id = Number(context.user.id);
      const _res = await updatePostService(id, data);
      return _res;
    },
  },
};
