import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../modules/user/entities/user.entity";
require('dotenv').config()

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "masterbackend_db",
  entities:    [User],
  synchronize: true, // ⚠ dev only — ໃຊ້ migrations ໃນ production
  logging: true,
});
