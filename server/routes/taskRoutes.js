import express from "express";
import {
  addTask,
  getAllTasks,
  getTasksByDay,
  deleteTasks,
  checkTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllTasks);
router.get("/:day", protect, getTasksByDay);
router.post("/", protect, addTask);
router.patch("/:id", protect, checkTask)
router.delete("/", protect, deleteTasks);

export default router;
