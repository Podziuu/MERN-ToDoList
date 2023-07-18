import asyncHandler from "express-async-handler";

// Get all tasks
// GET /
// PRIVATE
const getAllTasks = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All tasks" });
});

// Get tasks by day
// GET /:day
// PRIVATE
const getTasksByDay = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Tasks by day" });
});

// Add new task
// POST /
// PRIVATE
const addTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Add new task" });
});

// Delete task
// DELETE /:id
// PRIVATE
const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "delete task" });
});

export { getAllTasks, getTasksByDay, addTask, deleteTask };
