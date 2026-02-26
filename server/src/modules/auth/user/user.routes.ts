import { Router } from "express";
import { createUser, login_User, verify_Otp } from "./user.controller";

const router = Router();

router
  .post("/create_user", createUser)
  .post("/verify_otp", verify_Otp)
  .post("/login", login_User);

export default router;
