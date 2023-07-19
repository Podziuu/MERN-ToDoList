import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  checked: { type: Boolean, required: true, default: false },
  day: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
