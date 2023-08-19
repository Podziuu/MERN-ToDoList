import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getStats,
  forgotPassword,
  checkAuth,
  resetPassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/stats", protect, getStats);
router.post("/forgot", forgotPassword);
router.get("/check", checkAuth);
router.put("/reset", resetPassword);

export default router;
