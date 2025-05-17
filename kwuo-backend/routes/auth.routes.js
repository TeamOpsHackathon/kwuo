import express from "express";
import {
  handleSendCode,
  handleVerifyCode,
  registerUser,
  loginUser,
} from "../controllers/auth.controller.js";
import { handleSendOtp } from "../controllers/optController.js";

const router = express.Router();

router.post("/send-code", handleSendCode);
router.post("/verify-code", handleVerifyCode);
router.post("/register", registerUser);
router.post("/login", loginUser);
//@desc its controller is collected in the optController.js
router.post("/send-otp",handleSendOtp);

export default router;
