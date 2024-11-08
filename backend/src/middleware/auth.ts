import { Request, Response, NextFunction } from "express";

export const cookieAuthCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAuthenticated } = req.signedCookies;
  if (isAuthenticated) {
    // res.redirect("/frontend");
    next();
  } else {
    res.status(403).send();
  }
};

// src/auth.ts
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { UserPayload } from "../types/user";

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// function generateToken(user: UserPayload): string {
//   return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
// }

// function verifyToken(token: string): UserPayload | null {
//   try {
//     return jwt.verify(token, JWT_SECRET) as UserPayload;
//   } catch (error) {
//     return null;
//   }
// }

// export default {
//   generateToken,
//   verifyToken,
// };
