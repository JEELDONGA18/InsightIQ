import asynchandler from "../config/asyncHandler.config.js";
import { User } from "../model/user.model.js";
import { setCookie } from "../utils/cookie.js";
import { generateToken } from "../utils/jwt.js";

export const loginController = asynchandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      error: "Login failed",
      message: "Request body is missing or invalid",
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Login failed",
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(401).json({
      error: "Login failed",
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      error: "Login failed",
      message: "Invalid email or password",
    });
  }

  // Generate token
  const token = generateToken(user._id);
  // Token generated for user login

  setCookie(res, "token", token, 7 * 24 * 60 * 60 * 1000); // 7 day

  return res.json({
    success: true,
    message: "Login successful",
  });
});
