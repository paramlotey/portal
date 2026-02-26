import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const verifyed = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    );
    (req as any).user = verifyed;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
