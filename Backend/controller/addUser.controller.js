import asyncHandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

/**
 * Controller: addUser
 * Description: Allows only admin users to create a new user within the same company.
 */
const addUser = asyncHandler(async (req, res) => {
  const admin = req.admin;

  // Validate required input fields
  const { email, password, department: departmentName } = req.body;
  if (!email || !password || !departmentName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  // Find the target department for the new user
  const targetDepartment = await Department.findOne({
    name: departmentName.toLowerCase(),
    company: admin.company,
  });

  if (!targetDepartment) {
    return res.status(404).json({ message: "Target department not found." });
  }

  // Create new user in the same company but different department
  const newUser = await User.create({
    email,
    password,
    department: targetDepartment._id,
    company: admin.company,
  });

  // Send success response
  return res.status(201).json({
    message: "New user created successfully.",
    userId: newUser._id,
  });
});

export default addUser;
