import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import {
  create_Profile,
  create_ProfileByUserId,
  delete_Profile,
  get_Profile,
  get_ProfileById,
  get_ProfileByUserId,
  getAllEnums,
  update_Profile,
} from "./profile.service";
import apiResponse from "../../utils/apiResponse";

export const getEnums = asyncHandler(async (req: Request, res: Response) => {
  const enums = await getAllEnums();
  return apiResponse(200, "Enums Fetched Successfuly", true, res, enums);
});

export const createProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await create_Profile(req.body);
    return apiResponse(201, "Profile Created Successfuly", true, res, profile);
  },
);

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  // Implementation for fetching a profile by ID or other criteria can be added here
  const profile = await get_Profile();

  return apiResponse(200, "Profiles fetched successfully", true, res, profile);
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    // Implementation for updating a profile by ID can be added here
    const { id } = req.params as { id: string };
    const profile = req.body;
    await update_Profile(id, profile);
    return apiResponse(200, "Profile Updated Successfuly", true, res, {});
  },
);

export const deleteProfile = asyncHandler(
  async (req: Request, res: Response) => {
    // Implementation for deleting a profile by ID can be added here
    const { id } = req.params as { id: string };
    await delete_Profile(id);
    return apiResponse(200, "Profile Deleted Successfuly", true, res, {});
  },
);
export const getProfileById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const profile = await get_ProfileById(id);
    return apiResponse(200, "Profile Fetched Successfuly", true, res, profile);
  },
);

export const getProfileByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const profile = await get_ProfileByUserId(id);
    return apiResponse(200, "Profile Fetched Successfuly", true, res, profile);
  },
);

export const createProfileByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const profile = await create_ProfileByUserId(id, req.body);
    return apiResponse(201, "Profile Created Successfuly", true, res, profile);
  },
);
