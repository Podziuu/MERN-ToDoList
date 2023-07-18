import asyncHandler from "express-async-handler";

const authUser = asyncHandler(async (req, res) => {
  res.json({ message: "Auth user" });
});

export { authUser };
