import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// Get all tasks
// GET /
// PRIVATE
const getAllTasks = asyncHandler(async (req, res) => {
  const user = req.user;

  try {
    const tasks = await Task.find({ user });
    res.status(200).json({ tasks });
  } catch (err) {
    throw new Error("Something went wrong, please try again later.");
  }
});

// Get tasks by day
// GET /:day
// PRIVATE
const getTasksByDay = asyncHandler(async (req, res) => {
  const user = req.user;
  const { day } = req.params;

  try {
    const tasks = await Task.find({ user });
    const dayTasks = tasks.filter((task) => task.day === day);
    res.status(200).json({ tasks: dayTasks });
  } catch (err) {
    throw new Error("Something went wrong, please try again later.");
  }
});

// Add new task
// POST /
// PRIVATE
const addTask = asyncHandler(async (req, res) => {
  const { name, category, type, day } = req.body;

  const user = req.user;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const task = await Task.create(
      [
        {
          name,
          day,
          category,
          type,
          user: user._id,
        },
      ],
      { session: sess }
    );
    await User.findByIdAndUpdate(
      user._id,
      { $push: { tasks: task } },
      { new: true, session: sess }
    );
    await sess.commitTransaction();
    sess.endSession();
    res.status(200).json({ task });
  } catch (err) {
    res.status(500);
    throw new Error("Creating task failed, please try again later");
  }
});

// Delete task
// DELETE /:id
// PRIVATE
const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "delete task" });
});

export { getAllTasks, getTasksByDay, addTask, deleteTask };
