import { Router, Request, Response } from "express";
import userController from "../controllers/user.controller";
import { cookieAuthCheck } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/users", userController.getUsers);
userRouter.post("/signup", userController.addUser);
userRouter.get("/check-auth", cookieAuthCheck, userController.userProfile);
userRouter.get("/user/:id", userController.getUserById);
userRouter.put("/user/:id", userController.updateUserById);
userRouter.delete("/user/:id", userController.deleteUserById);
userRouter.post("/login", userController.loginUser);

export default userRouter;
