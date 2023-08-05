import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// Get all tasks
// GET /
// PRIVATE
const getAllTasks = asyncHandler(async (req, res) => {
  const user = req.user;

  const tasks = await Task.find({ user });
  if (tasks) {
    res.status(200).json({ tasks });
  } else {
    throw new Error("Something went wrong, please try again later.");
  }
});

// Get tasks by day
// GET /:day
// PRIVATE
const getTasksByDay = asyncHandler(async (req, res) => {
  const user = req.user;
  const { day } = req.params;

  const tasks = await Task.find({ user });
  const dayTasks = tasks.filter((task) => task.day === day);
  if (dayTasks) {
    res.status(200).json({ tasks: dayTasks });
  } else {
    throw new Error("Something went wrong, please try again later.");
  }
});

// Add new task
// POST /
// PRIVATE
const addTask = asyncHandler(async (req, res) => {
  const { name, category, type, day, checked } = req.body;

  const user = req.user;

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const targetDay = user.lastLoggedIn.getDate();
  const targetMonth = user.lastLoggedIn.getMonth();
  const targetYear = user.lastLoggedIn.getFullYear();
  let dayStreak = user.dayStreak;

  if (
    currentYear === targetYear &&
    currentMonth === targetMonth &&
    currentDay - 1 === targetDay
  ) {
    dayStreak++;
  } else if (
    currentYear === targetYear &&
    currentMonth === targetMonth &&
    currentDay - 1 > targetDay
  ) {
    dayStreak = 1;
  }

  const sess = await mongoose.startSession();
  sess.startTransaction();
  const task = await Task.create(
    [
      {
        name,
        checked,
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
    { $push: { tasks: task }, $set: { dayStreak, lastLoggedIn: currentDate } },
    { new: true, session: sess }
  );
  await sess.commitTransaction();
  sess.endSession();
  res.status(200).json({ task });
});

// Check task
// PATCH /:id
// PRIVATE
const checkTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const task = await Task.findById(id);

  if (task && task.user.equals(user._id)) {
    task.checked = !task.checked;
    task.save();

    res.status(200).json({ task });
  } else {
    res.status(401);
    throw new Error("You're not the owner of the task");
  }
});

// Delete task
// DELETE /:id
// PRIVATE
const deleteTasks = asyncHandler(async (req, res) => {
  const user = req.user;
  const day = req.body.day;

  const completedTasks = await Task.find({ user, checked: true, day });
  const Ids = completedTasks.map((t) => t._id);

  const sess = await mongoose.startSession();
  sess.startTransaction();
  await Task.deleteMany(
    {
      user: user._id,
      checked: true,
      day,
      _id: { $in: Ids },
    },
    { session: sess }
  );
  await User.updateMany(
    {
      _id: user._id,
    },
    { $pull: { tasks: { $in: Ids } } },
    { session: sess }
  );
  await sess.commitTransaction();
  sess.endSession();
  res.status(200).json({ message: "Successfuly deleted tasks" });
});

export { getAllTasks, getTasksByDay, addTask, deleteTasks, checkTask };
