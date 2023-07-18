import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes)

app.get("/", (req, res) => res.send("Server is ready"));

app.listen(port, () => console.log(`Server started on port ${port}`));
