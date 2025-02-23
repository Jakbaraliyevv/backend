import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  logincontroller,
  register,
  verify,
} from "../../controller/users.controller.js";
const router = Router();
router.post("/sign-in", logincontroller);
router.post("/sign-up", register);
router.post("/reset-password", forgotPassword);
router.post("/verify", verify);
router.post("/change-password", changePassword);

export { router };
