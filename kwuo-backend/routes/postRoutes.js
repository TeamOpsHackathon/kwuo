// routes/postRoutes.js
import express from "express";
import {
  createPost,
  likePost,
  commentOnPost,
  sharePost,
  unlikePost,
} from "../controllers/postController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Protect these routes with authentication
router.post("/", authenticateUser, createPost); // Create a post
router.post("/:id/like", authenticateUser, likePost); // Like a post
router.post("/:id/comment", authenticateUser, commentOnPost); // Comment on a post
router.post("/:id/share", authenticateUser, sharePost); // Share a post
router.post("/:id/unlike", authenticateUser, unlikePost); //Unlike a post
export default router;
