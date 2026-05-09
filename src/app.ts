import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// import { userRouter } from "./routes/user.routes";
import { AppDataSource } from "./db/data-source";
import { userRouter } from "./modules/user/routers/user.routes";
import { authRouters } from "./modules/auth/routes/auth.routes";
import { JwtPayloadDto } from "./modules/auth/types/auth.types";
import { postRouters } from "./modules/post/routes/post.routes";
require("dotenv").config();

export const app = express();

const startServer = async () => {
  // Intial DB
  await AppDataSource.initialize()
    .then(() => {
      console.log("Connected DB Success");
    })
    .catch((err: Error) => {
      console.log("Cannot connect DB " + err);
      throw new Error(err as any);
    });

  // ── Middleware ─────────────────────────────────────
  app.use(helmet()); // ຄວາມປອດໄພ HTTP headers
  app.use(cors()); // ອະນຸຍາດ cross-origin
  app.use(morgan("dev")); // log ທຸກ request
  app.use(express.json()); // ແປ JSON body → req.body

  // ── Routes ─────────────────────────────────────────
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouters);
  app.use("/api/posts", postRouters);

  // ── Global Error Handler ────────────────────────────
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.error(err.stack);
      res.status(500).json({ success: false, message: err.message });
    },
  );

  app.listen(3001, () => {
    console.log("Server is running http://localhost:3001");
  });
};

startServer();
