import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  GetData,
  logincontroller,
  postData,
  register,
  verify,
} from "../../controller/users.controller.js";
const router = Router();
router.post("/sign-in", logincontroller);
router.post("/sign-up", register);
router.post("/reset-password", forgotPassword);
router.post("/verify", verify);
router.post("/change-password", changePassword);
router.get("/get-products", GetData);
router.post("/post-products", postData);

export { router };
