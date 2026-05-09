import { AppDataSource } from "../../../db/data-source";
import {
  responseError,
  responseSuccessMany,
  responseSuccessOne,
} from "../../../utils/responses";
import { Post } from "../entities/post.entity";
import { CreatePostDto, PostQueryDto } from "../types/post.types";

const postRep = AppDataSource.getRepository(Post);

export const createPostService = async (data: CreatePostDto) => {
  if (!data.title) return responseError("Bad request");

  const post = postRep.create(data);
  const createPost = await postRep.save(post);

  return responseSuccessOne("Create post success", createPost);
};

export const getAllPostsService = async (query: PostQueryDto) => {
  const db = postRep
    .createQueryBuilder("post")
    .leftJoinAndSelect("post.author", "author");

  if (query.keyword) {
    console.log({ keyword: query.keyword });
    db.where("(post.title LIKE :keyword OR post.content LIKE :keyword)", {
      keyword: `%${query.keyword}%`,
    });
  }
  db.skip(Number(query.page - 1) * query.limit).take(Number(query.limit));
  console.log({ sql: db.getSql() });

  const [posts, count] = await db
    .orderBy("post.createdAt", "DESC")
    .getManyAndCount();

  return responseSuccessMany(
    "Get post success",
    posts.map((post) => {
      return { ...post, author: { ...post.author, password: undefined } };
    }),
    {
      total: count,
      limit: query.limit,
      page: query.page,
    },
  );
};

