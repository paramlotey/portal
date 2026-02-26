import { Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import apiResponse from "../../../utils/apiResponse";
import { addUser, loginUser, verifyOTP } from "./user.service";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return apiResponse(200, "Please Fill Both Email and Password", true, res);
  }
  await addUser(email, password);
  return apiResponse(
    200,
    "Please Check Your Email For Otp and Verify to Proceed Further",
    true,
    res,
  );
});

export const verify_Otp = asyncHandler(async (req: Request, res: Response) => {
  const { otp } = req.body;
  const email = req.query.email as string;
  if (!email || !otp) {
    return apiResponse(200, "Please Fill Both Email and Otp", true, res);
  }
  const result = await verifyOTP(email, otp);
  return apiResponse(200, result.message, true, res);
});

export const login_User = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return apiResponse(200, "Please Fill Both Email and Password", true, res);
  }
  const user = await loginUser(email, password);
  res.cookie("refresh_token", user.refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return apiResponse(200, `Login Successful`, true, res, user);
});
