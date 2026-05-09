import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middlewares";
import {
  createPostController,
  getAllPostsController,
} from "../controllers/post.controllers";

export const postRouters = Router();

postRouters.post("/", authenticate, authorize("user"), createPostController);
postRouters.get("/", authenticate, getAllPostsController);
