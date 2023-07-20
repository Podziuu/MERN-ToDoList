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
router.post("/:id", protect, checkTask)
router.delete("/:id", protect, deleteTasks);

export default router;
