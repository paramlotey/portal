import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { getAccessToken } from "./auth.service";
import apiResponse from "../../utils/apiResponse";

export const authRefreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token;
    const accessToken = await getAccessToken(refreshToken);
    return apiResponse(200, "Token Refreshed", true, res, { accessToken });
  },
);
