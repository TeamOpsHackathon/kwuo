import express from "express";
import {
  handleSendCode,
  handleVerifyCode,
  registerUser,
  loginUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/send-code", handleSendCode);
router.post("/verify-code", handleVerifyCode);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
