import asynchandler from "../config/asyncHandler.config.js";
import { verifyJwt } from "../utils/jwt.js";

const auth = asynchandler(async (req, res, next) => {
  // Try to get token from cookie
  let token = req.cookies?.jwttoken;
  console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({
      error: "Access denied. No token provided.",
      message: "Please login to access this resource",
    });
  }

  // Verify token
  const decoded = verifyJwt(token);
  if (!decoded) {
    return res.status(401).json({
      error: "Invalid token",
      message: "Please provide a valid token",
    });
  }

  const user = decoded;
  console.log("Decoded token:", user);
  req.user = user.userId;
  console.log("Authenticated user ID:", req.user);
  next();
});

export default auth