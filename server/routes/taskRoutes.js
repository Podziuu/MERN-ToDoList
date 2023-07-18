import express from "express";
import {
  addTask,
  getAllTasks,
  getTasksByDay,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllTasks);
router.get("/:day", protect, getTasksByDay);
router.post("/", protect, addTask);
router.delete("/:id", protect, deleteTask);

export default router;
