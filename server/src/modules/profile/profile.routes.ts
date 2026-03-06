import { Router } from "express";
import {
  createProfile,
  createProfileByUserId,
  deleteProfile,
  getEnums,
  getProfile,
  getProfileById,
  getProfileByUserId,
  updateProfile,
} from "./profile.controller";

const router = Router();

router
  .get("/enums", getEnums)
  .post("/create_profile", createProfile)
  .get("/get_profile", getProfile)
  .put("/update_profile/:id", updateProfile)
  .delete("/delete_profile/:id", deleteProfile)
  .get("/get_profile_by_id/:id", getProfileById)
  .get("/get_profile_by_user_id/:id", getProfileByUserId)
  .post("/create_profile_by_user_id/:id", createProfileByUserId);

export default router;
