import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";
import { compareHash, hashed } from "../utils/hash.util";

// Get users
const getUsers = (req: Request, res: Response) => {
  const users = userModel.findAll();
  res.json(users);
};

// Get user by id
const getUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const user = userModel.findById(id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user);
};

// Get user by id
const getUserByUsername = (
  req: Request<{ username: string }>,
  res: Response
) => {
  const { username } = req.body;
  const user = userModel.findByUsername(username);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user);
};

// Add user
const addUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { username, password, firstname, lastname } = req.body;
  const hashedPassword = await hashed(password);
  const user = userModel.create({
    username,
    password: hashedPassword,
    firstname,
    lastname,
  });
  res.status(201).json(user);
};

// Update user by id
const updateUserById = (
  req: Request<{ id: string }, {}, User>,
  res: Response
) => {
  const { id } = req.params;
  const { username, firstname, lastname } = req.body;
  const user = userModel.update(id, {
    username,
    firstname,
    lastname,
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
};

// Delete user by id
const deleteUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const isDeleted = userModel.delete(id);
  if (!isDeleted) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).send("User deleted!");
};

// Login user
const loginUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { username, password } = req.body;
  const user = userModel.findByUsername(username);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const isMatch = await compareHash(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Password is invalid " });
    return;
  }
  res.cookie("isAuthenticated", true, {
    httpOnly: true,
    maxAge: 3 * 60 * 1000,
    signed: true,
  });
  res.cookie("userId", user.id, {
    httpOnly: true,
    maxAge: 3 * 60 * 1000,
    signed: true,
  });
  res.status(200).json({ message: "Login authenticated" });
  // res.redirect("/profile");
};

// Check auth profile
const userProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.signedCookies;
    if (!userId) {
      res.status(401).json({ message: "not authorized" });
      return;
    }
    console.log(userId);
    const user = await userModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "not found" });
      return;
    }
    // console.log(user);
    // const info = {
    //   id: user.id,
    //   username: user.username,
    // };
    res.status(200).json(user);
    // res.status(200).json(info);
  } catch (err) {
    console.error(err);
  }
};

export default {
  getUsers,
  getUserById,
  //   getUserByUsername,
  addUser,
  updateUserById,
  deleteUserById,
  loginUser,
  userProfile,
};
