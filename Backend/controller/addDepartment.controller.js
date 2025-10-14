import asyncHandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

/**
 * Controller: addDepartment
 * Description: Allows only admin users to create a new department within their company.
 */
const addDepartment = asyncHandler(async (req, res) => {
  const admin = req.admin;
  // Extract input data and validate
  const { department: departmentName, description } = req.body;
  if (!departmentName) {
    return res.status(400).json({ message: "Department name is required." });
  }

  // Check if department already exists within same company
  const existingDepartment = await Department.findOne({
    name: departmentName.toLowerCase(),
    company: admin.company,
  });

  if (existingDepartment) {
    return res.status(409).json({ message: "Department already exists." });
  }

  // Create new department
  const newDepartment = await Department.create({
    name: departmentName.toLowerCase(),
    description: description || `${departmentName} Department`,
    company: admin.company,
  });

  // Send success response
  return res.status(200).json({
    message: "New department created successfully.",
    department: newDepartment,
  });
});

export default addDepartment;
