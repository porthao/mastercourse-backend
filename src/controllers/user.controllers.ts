import { Request, Response } from "express";
import { User } from "../types/user.types";

let users: User[] = [
  { id: 1, name: "porthao", email: "porthao@gmail.com" },
  { id: 2, name: "jone", email: "jone@gmail.com" },
];

export const getUsers = (req: Request, res: Response) => {
  if (!req.query.limit) {
    res.status(400).json({ success: false, message: "Limit must required" });
    return;
  }
  if (!req.query.page) {
    throw new Error("Internal server error");
  }

  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const start = (page - 1) * limit;

  const _users = users.slice(start, start + limit);

  res.status(200).json({
    success: true,
    message: "Get users success",
    data: _users,
  });
};

export const getUserById = (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User id must required" });
  }

  // 1. Using find
  const _user = users.find((u) => u.id === userId);
  console.log({ _user });
  if (!_user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found for " + userId });
  }
  res
    .status(200)
    .json({ success: true, message: "Get user success", data: _user });

  // 2. Using filter
  // const _users = users.filter((u) => u.id === userId);
  // console.log({ _users });
  // if (!_users.length) {
  //   return res
  //     .status(404)
  //     .json({ success: false, message: "User not found for " + userId });
  // }
  // res
  //   .status(200)
  //   .json({ success: true, message: "Get user success", data: _users[0] });
};

export const findUser = (req: Request, res: Response) => {
  const keyword = String(req.query.q);
  // const _users = users.filter((u) => u.name === keyword || u.email === keyword);
  const _users = users.filter(
    (u) =>
      u.name.toUpperCase().includes(keyword.toUpperCase()) ||
      u.email === keyword,
  );
  if (!_users.length) {
    return res.status(404).json({ success: false, message: "Users not found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Find users success", data: _users });
};

export const addNewUser = (req: Request, res: Response) => {
  const data = req.body;
  console.log({ data: data });

  if (!data.name) {
    return res
      .status(400)
      .json({ success: false, message: "Name must required" });
  }

  if (!data.email) {
    return res
      .status(400)
      .json({ success: false, message: "Email must required" });
  }

  const newUserId = users.length + 1;
  const newUser = { id: newUserId, ...data };
  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "Create new user success",
    data: newUser,
  });
};

export const updateUserByAllKeys = (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (!userId)
    return res
      .status(400)
      .json({ success: false, message: "User id must required" });

  const data = req.body;
  const existingUser = users.some((u) => u.id === userId);
  if (!existingUser)
    return res
      .status(404)
      .json({ success: false, message: "This user not foud" });

  let updateUserData = {};

  users = users.map((u) => {
    if (u.id === userId) {
      updateUserData = { ...u, ...data };
      return { ...u, ...data };
    }

    return u;
  });

  res.status(200).json({
    success: true,
    message: "Update user success",
    data: updateUserData,
  });
};

export const updateUser = (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex < 0) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const data = req.body;

  users[userIndex].name = data.name;
  users[userIndex].email = data.email;

  res.status(200).json({
    success: true,
    message: "Update user success",
    data: users[userIndex],
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  users = users.filter((u) => u.id !== userId);

  res.status(200).json({ success: true, message: "Delete user success" });
};
