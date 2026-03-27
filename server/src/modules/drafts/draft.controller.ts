import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { delete_draft, load_draft, save_draft } from "./draft.service";
import apiResponse from "../../utils/apiResponse";
import { $Enums } from "@prisma/client";
import { ApiError } from "../../utils/ApiError";

export const SaveDraft = asyncHandler(async (req: Request, res: Response) => {
  const { userId, formType, data, step } = req.body;

  if (!userId || !formType || !data) {
    throw new ApiError(400, "userId, formType and data are required");
  }

  const createDraft = await save_draft(userId, formType, data, step);
  return apiResponse(201, "Draft Saved Successfully", true, res, createDraft);
});

export const LoadDraft = asyncHandler(async (req: Request, res: Response) => {
  const { userId, formType } = req.query;

  if (!userId || !formType) {
    throw new ApiError(400, "userId and formType are required");
  }

  const loadDraft = await load_draft(
    formType as $Enums.draft_form_type,
    Number(userId),
  );

  return apiResponse(200, "Draft Loaded Successfully", true, res, loadDraft);
});

export const DeleteDraft = asyncHandler(async (req: Request, res: Response) => {
  const { userId, formType } = req.query;

  if (!userId || !formType) {
    throw new ApiError(400, "userId and formType are required");
  }

  await delete_draft(formType as $Enums.draft_form_type, Number(userId));

  return apiResponse(200, "Draft Deleted Successfully", true, res, null);
});
