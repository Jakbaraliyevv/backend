import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  logincontroller,
  verify,
} from "../../controller/users.controller.js"; // ✅ TO‘G‘RI IMPORT

const router = Router();
router.post("/sign-in", logincontroller); // ✅ ISMI TO‘G‘RI BO‘LDI
router.post("/reset-password", forgotPassword); // ✅ ISMI TO‘G‘RI BO‘LDI
router.post("/verify", verify); // ✅ ISMI TO‘G‘RI BO‘LDI
router.post("/change-password", changePassword); // ✅ ISMI TO‘G‘RI BO‘LDI

export { router };
