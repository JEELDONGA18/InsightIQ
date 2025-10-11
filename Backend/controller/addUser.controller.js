import asyncHandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

/**
 * Controller: addUser
 * Description: Allows only admin users to create a new user within the same company.
 */
const addUser = asyncHandler(async (req, res) => {
  const userId = req.user; // ID of currently logged-in user (from auth middleware)

  //  Check if requesting user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  //  Verify that the user belongs to a valid department in their company
  const department = await Department.findOne({
    _id: user.department,
    company: user.company,
  });

  if (!department) {
    return res.status(403).json({ message: "User is not in a valid department." });
  }

  // Ensure that only 'admin' department users can add new users
  if (department.name.toLowerCase() !== "admin") {
    return res
      .status(403)
      .json({ message: "You don't have authority to add a user." });
  }

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
    company: user.company,
  });

  if (!targetDepartment) {
    return res.status(404).json({ message: "Target department not found." });
  }

  // Create new user in the same company but different department
  const newUser = await User.create({
    email,
    password,
    department: targetDepartment._id,
    company: user.company,
  });

  // Send success response
  return res.status(201).json({
    message: "New user created successfully.",
    userId: newUser._id,
  });
});

export default addUser;
