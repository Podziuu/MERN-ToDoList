import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import generateToken from "../utils/generateToken.js";

// login user AND set token
// POST /api/users/auth
// PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Register a new user AND set token
// POST /api/users
// PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Logout user AND delete token
// POST /api/users/logout
// PUBIC
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// Get user statistics
// GET /api/users/stats
// PRIVATE
const getStats = asyncHandler(async (req, res) => {
  const user = req.user;

  const tasks = await Task.find({ user });
  if (!tasks) {
    throw new Error("Something went wrong, please try again later.");
  }

  const mostFrequentCategory = mostFrequentProperty(tasks, "category");
  const mostFrequentDay = mostFrequentProperty(tasks, "day");
  const completedTasks = tasks.filter((task) => task.checked);
  const completionPercentage = (
    (completedTasks.length / tasks.length) *
    100
  ).toFixed(2);

  res.status(200).json({
    dayStreak: user.dayStreak,
    mostFrequentCategory,
    mostFrequentDay,
    onGoingTasks: user.tasks.length,
    completedTasks: user.completedTasks,
    completionPercentage,
  });
});
export { authUser, registerUser, logoutUser, getStats };

const mostFrequentProperty = (tasks, key) => {
  const propertyCount = {};

  tasks.forEach((task) => {
    const property = key === "category" ? task.category : task.day;
    propertyCount[property] = (propertyCount[property] || 0) + 1;
  });

  let mostFrequentProperty = null;
  let maxCount = 0;

  for (const property in propertyCount) {
    if (propertyCount[property] > maxCount) {
      maxCount = propertyCount[property];
      mostFrequentProperty = property;
    }
  }
  return mostFrequentProperty;
};
