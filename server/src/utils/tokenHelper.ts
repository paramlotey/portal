import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const accessToken = process.env.ACCESS_TOKEN_SECRET || "default_access_token_secret";
const refreshToken = process.env.REFRESH_TOKEN_SECRET || "default_refresh_token_secret";

const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, accessToken, { expiresIn: "15m" });
}

const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, refreshToken, { expiresIn: "7d" });
}

export { generateAccessToken, generateRefreshToken };