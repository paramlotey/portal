import pool from "../../../config/db";
import bcrypt from "bcrypt";
import { sendOTPEmail } from "../../../utils/otpHelper";
import { ApiError } from "../../../utils/ApiError";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/tokenHelper";
export const addUser = async (email: string, password: string) => {
  const existingUser = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );

  if (existingUser.rows.length > 0) {
    throw new ApiError(400, "User Already Exists. Please Login To Proceed");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedPassword = await bcrypt.hash(password, 10);
  await sendOTPEmail(email, otp);
  const add_user = await pool.query(
    `
        INSERT INTO users (email,password,otp) VALUES ($1 , $2, $3) RETURNING *`,
    [email, hashedPassword, otp],
  );
  return add_user.rows[0];
};

export const verifyOTP = async (email: string, otp: number) => {
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email = $1`,
    [email],
  );

  if (user.rows.length === 0) {
    throw new ApiError(404, "User Not Found");
  }
  const storedOtp = user.rows[0].otp;

  const isVerified = user.rows[0].is_verified;

  if (isVerified) {
    throw new ApiError(400, "User Already Verified. Please Login To Proceed");
  }

  if (storedOtp !== otp.toString()) {
    throw new ApiError(400, "Invalid OTP");
  }
  await pool.query(
    `
    UPDATE users SET otp = NULL, is_verified = true WHERE email = $1`,
    [email],
  );
  return { message: "OTP Verified Successfully" };
};

export const loginUser = async (email: string, password: string) => {
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email = $1`,
    [email],
  );

  if (user.rows.length == 0) {
    throw new ApiError(404, "User Not Found");
  }
  const passwordVerify = await bcrypt.compare(password, user.rows[0].password);

  if (!passwordVerify) {
    throw new ApiError(400, "Invalid Password");
  }
  if (user.rows[0].is_verified !== true) {
    throw new ApiError(
      400,
      "User Not Verified, Please Verify First Then Login",
    );
  }

  const accessToken = generateAccessToken({
    id: user.rows[0].id,
    email: user.rows[0].email,
  });
  const refreshToken = generateRefreshToken({
    id: user.rows[0].id,
    email: user.rows[0].email,
  });

  return { accessToken, refreshToken };
};
