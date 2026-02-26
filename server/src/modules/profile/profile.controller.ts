import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { getAllEnums } from "./profile.service";
import apiResponse from "../../utils/apiResponse";

export const getEnums = asyncHandler(async (req: Request, res: Response) => {
  const enums = await getAllEnums();
  return apiResponse(200, "Enums Fetched Successfuly", true, res, enums);
});
