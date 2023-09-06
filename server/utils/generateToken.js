import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: "64f8c3bde22afe11d9d4937f--strong-kleicha-518bbc.netlify.app"
  });
};

export default generateToken;
