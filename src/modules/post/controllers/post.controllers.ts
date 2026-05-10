import { Request, Response } from "express";
import {
  createPostService,
  deletePostService,
  getAllPostsService,
  getMyPostsService,
  getPostByIdService,
  updatePostService,
} from "../services/post.services";
import {
  CreatePostDto,
  PostQueryDto,
  UpdatePostDto,
} from "../types/post.types";

export const createPostController = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    title: body.title,
    content: body.content,
    published: body.published,
    author_id: req.user?.id,
  } as CreatePostDto;

  const _res = await createPostService(data);

  res.status(!_res.success ? 400 : 200).json(_res);
};

export const getAllPostsController = async (req: Request, res: Response) => {
  const query = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    keyword: req.query.q,
  } as PostQueryDto;
  const _res = await getAllPostsService(query);

  res.status(200).json(_res);
};

export const getPostByIdController = async (req: Request, res: Response) => {
  const _res = await getPostByIdService(Number(req.params.id));

  res.status(!_res.success ? 404 : 200).json(_res);
};

export const updatePostController = async (req: Request, res: Response) => {
  const body: UpdatePostDto = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    author_id: Number(req.user?.id),
  };

  const _res = await updatePostService(Number(req.params.id), body);

  res.status(!_res.success ? 404 : 200).json(_res);
};

export const deletePostController = async (req: Request, res: Response) => {
  const _res = await deletePostService(
    Number(req.params.id),
    Number(req.user?.id),
  );

  res.status(!_res.success ? 404 : 200).json(_res);
};

export const getMyPostsController = async (req: Request, res: Response) => {
  const query = {
    ...req.query,
    page: Number(req.query.page || 1),
    limit: Number(req.query.limit || 10),
    author_id: Number(req.user?.id),
  };
  const _res = await getMyPostsService(query as PostQueryDto);

  console.log({ _res });

  res.status(200).json(_res);
};
