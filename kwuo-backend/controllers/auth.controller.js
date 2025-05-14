import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
  sendVerificationCode,
  verifyCode,
} from "../services/twilio.service.js";

const jwtSecret = process.env.JWT_SECRET || "your_default_jwt_secret";

export const handleSendCode = async (req, res) => {
  const { phone } = req.body;
  try {
    await sendVerificationCode(phone);
    res.status(200).json({ message: "Verification code sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send code." });
  }
};

export const handleVerifyCode = async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verification = await verifyCode(phone, code);
    if (verification.status === "approved") {
      const user = await User.findOne({ phone });
      if (!user) return res.status(404).json({ error: "User not found." });

      const token = jwt.sign({ id: user._id, phone: user.phone }, jwtSecret, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Verified successfully.", token });
    } else {
      res.status(401).json({ error: "Invalid code." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed." });
  }
};



export const registerUser = async (req, res) => {
  const { email, password, phone } = req.body;

  try {
    const existing = await User.findOne({ phone });
    if (existing)
      return res.status(409).json({ error: "Number already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed." });
  }
};

export const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ error: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed." });
  }
};
