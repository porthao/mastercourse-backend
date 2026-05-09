import { Request, Response } from "express";
import {
  createPostService,
  getAllPostsService,
} from "../services/post.services";
import { CreatePostDto, PostQueryDto } from "../types/post.types";

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
