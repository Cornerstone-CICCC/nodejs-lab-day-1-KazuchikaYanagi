// Create your server
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
dotenv.config();

// Create server
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:4321", // Astro port
    credentials: true, // allow cookies
  })
);
app.use(cookieParser(process.env.COOKIE_SIGN_KEY)); // or use cookie-session/cookieSession instead
// app.use(
//   cookieSession({
//     name: "session",
//     maxAge: 3 * 60 * 1000,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import userRouter from "./routes/user.routes";
app.use("/", userRouter);

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).send("Invalid route");
});

// Start server
const PORT: number = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
