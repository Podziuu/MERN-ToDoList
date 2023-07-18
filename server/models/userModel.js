import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: "Task" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
