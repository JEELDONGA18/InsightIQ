import asyncHandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

/**
 * Controller: addDepartment
 * Description: Allows only admin users to create a new department within their company.
 */
const addDepartment = asyncHandler(async (req, res) => {
  const userId = req.user; // ID of currently logged-in user (from auth middleware)

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Verify that user belongs to a valid department
  const department = await Department.findOne({
    _id: user.department,
    company: user.company,
  });

  if (!department) {
    return res.status(403).json({ message: "User is not in a valid department." });
  }

  //  Ensure user has admin privileges
  if (department.name.toLowerCase() !== "admin") {
    return res
      .status(403)
      .json({ message: "You don't have authority to add a department." });
  }

  // Extract input data and validate
  const { department: departmentName, description } = req.body;
  if (!departmentName) {
    return res.status(400).json({ message: "Department name is required." });
  }

  // Check if department already exists within same company
  const existingDepartment = await Department.findOne({
    name: departmentName.toLowerCase(),
    company: user.company,
  });

  if (existingDepartment) {
    return res.status(409).json({ message: "Department already exists." });
  }

  // Create new department
  const newDepartment = await Department.create({
    name: departmentName.toLowerCase(),
    description: description || `${departmentName} Department`,
    company: user.company,
  });

  // Send success response
  return res.status(201).json({
    message: "New department created successfully.",
    department: newDepartment,
  });
});

export default addDepartment;
