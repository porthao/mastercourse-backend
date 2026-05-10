import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middlewares";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getMyPostsController,
  getPostByIdController,
  updatePostController,
} from "../controllers/post.controllers";

export const postRouters = Router();

postRouters.post("/", authenticate, authorize("user"), createPostController);
postRouters.get("/", authenticate, getAllPostsController);
postRouters.get("/my-posts", authenticate, getMyPostsController);
postRouters.get("/:id", authenticate, getPostByIdController);
postRouters.patch("/:id", authenticate, updatePostController);
postRouters.delete("/:id", authenticate, deletePostController);
