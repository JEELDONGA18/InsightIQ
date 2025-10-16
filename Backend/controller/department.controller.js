import asynchandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

const department = asynchandler(async (req, res) => {
  const userId = req.user;

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User does not exist." });
  }

  const userDept = await Department.findOne({
    _id: user.department,
    company: user.company,
  });

  if (!userDept) {
    return res
      .status(404)
      .json({ message: "User does not belong to any department" });
  }

  return res
    .status(200)
    .json({ userDept, message: "Department found successfully." });
});

export const editDepartment = asynchandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  console.log("name", name, description);
  if (!name) {
    return res.status(400).json({ message: "Department name is required." });
  }

  const updated = await Department.findByIdAndUpdate(
    id,
    { name: name.toLowerCase(), description },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Department not found." });
  }

  res
    .status(200)
    .json({ message: "Department updated successfully.", department: updated });
});

export const deleteDepartment = asynchandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Department.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: "Department not found." });
  }
  res.status(200).json({ message: "Department deleted successfully.", id });
});

export default department;
