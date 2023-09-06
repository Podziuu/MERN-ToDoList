import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

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
  let completionPercentage = (
    (completedTasks.length / tasks.length) *
    100
  ).toFixed(2);

  if(completionPercentage === "NaN") completionPercentage = 0;

  res.status(200).json({
    dayStreak: user.dayStreak,
    mostFrequentCategory,
    mostFrequentDay,
    onGoingTasks: user.tasks.length,
    completedTasks: user.completedTasks,
    completionPercentage,
  });
});

// Check if user is authenticated
// GET /api/users/check
// PUBLIC
const checkAuth = asyncHandler(async (req, res) => {
  const jwtCookie = req.cookies.jwt;

  if (jwtCookie) {
    const decoded = jwt.verify(jwtCookie, process.env.JWT_SECRET);
    if (decoded.exp <= Date.now() / 1000) {
      return res
        .status(401)
        .json({ message: "Token has expired", isAuthenticated: false });
    }
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

// Send mail to user with reset password link
// POST /api/users/forgot
// PUBLIC
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const secret = process.env.JWT_SECRET + user.password;
  const token = jwt.sign({ email: user.email, _id: user._id }, secret, {
    expiresIn: "15m",
  });
  const link = `http://localhost:5173/reset?token=${token}&id=${user._id}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "barpodemski@gmail.com",
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: '"Bartosz" <barpodemski@gmail.com>',
    to: user.email,
    subject: "Password Reset",
    html: `
      <p>${link}</p>
      `,
  });

  res.json("Good");
});

// Reset user password
// PUT /api/users/reset
// Semi-PRIVATE
const resetPassword = asyncHandler(async (req, res) => {
  const { password, userId, token } = req.body;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error("User not found");
  }

  const secret = process.env.JWT_SECRET + user.password;

  const payload = jwt.verify(token, secret);

  user.password = password;
  user.save();
  res.status(201).json({ message: "Password reseted" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getStats,
  forgotPassword,
  checkAuth,
  resetPassword,
};

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
