import { AppDataSource } from "../../../db/data-source";
import {
  responseError,
  responseSuccessMany,
  responseSuccessOne,
} from "../../../utils/responses";
import { Post } from "../entities/post.entity";
import {
  CreatePostDto,
  PostQueryDto,
  UpdatePostDto,
} from "../types/post.types";

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

export const getPostByIdService = async (id: number) => {
  // const post = await postRep.findOneBy({ id });

  // const post = await postRep
  //   .createQueryBuilder("post")
  //   .leftJoinAndSelect("post.author", "author")
  //   .where("post.id = :postId", { postId: id })
  //   .getOne();

  const post = await postRep.findOne({
    where: { id },
    relations: ["author"],
    // select: { author: { id: true, name: true } },
  });

  if (!post) return responseError("Post not found");

  return responseSuccessOne("Get post success", {
    ...post,
    author: { ...post.author, password: undefined },
  });
};

export const updatePostService = async (id: number, data: UpdatePostDto) => {
  // 1. Validate is owner
  const post = await postRep.findOneBy({ id, author_id: data.author_id });
  if (!post) return responseError("Post not found");
  // if (post.author_id !== data.author_id) return responseError("Forbiden");

  // 2. update post
  Object.assign(post, data);
  const updatePost = await postRep.save(post);

  // 3. return data
  return responseSuccessOne("Update post success", updatePost);
};

export const deletePostService = async (id: number, author_id: number) => {
  const post = await postRep.findOneBy({ id, author_id });
  if (!post) return responseError("Post not found");
  await postRep.delete(id);

  return responseSuccessOne("Delete post success", post);
};

export const getMyPostsService = async (query: PostQueryDto) => {
  const db = postRep.createQueryBuilder("post");

  if (query.published === "true") {
    db.where("post.publised = :published", { published: true });
  }

  if (query.published === "false") {
    db.where("post.publised = :published", { published: false });
  }

  if (query.keyword) {
    db.andWhere("(post.title LIKE :keyword OR post.content LIKE :keyword)", {
      keyword: query.keyword,
    });
  }

  if (query.author_id) {
    db.andWhere("post.author_id = :authorId", { authorId: query.author_id });
  }

  const [myPosts, count] = await db
    .skip((query.page - 1) * query.limit)
    .take(query.limit)
    .getManyAndCount();

  return responseSuccessMany("Get my post success", myPosts, {
    total: count,
    limit: query.limit,
    page: query.page,
  });
};
