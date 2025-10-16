import asynchandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

const getDepartmentName = asynchandler(async (req, res) => {
  const userId = req.user; // ensure this comes from your auth middleware

  const departmentId = await User.findById(userId).select("department");
  if (!departmentId) {
    return res.status(404).json({ message: "User doesn't have any department." });
  }
  
  console.log(departmentId);
  

  const departmentName = await Department.findById(departmentId.department).select("name");
  if (!departmentName) {
    return res.status(404).json({ message: "Department not found." });
  }

  return res.status(200).json({
    message: "Got Department.",
    departmentName: departmentName.name
  });
});

export { getDepartmentName };
