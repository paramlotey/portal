import { Router } from "express";
import { getEnums } from "./profile.controller";

const router = Router();

router.get("/enums", getEnums);

export default router;
