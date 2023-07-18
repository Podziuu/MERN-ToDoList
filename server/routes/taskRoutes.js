import express from "express";
import {
  addTask,
  getAllTasks,
  getTasksByDay,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:day", getTasksByDay);
router.post("/", addTask);
router.delete("/:id", deleteTask);

export default router;