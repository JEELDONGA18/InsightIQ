import asyncHandler from "../config/asyncHandler.config.js";
import { User } from "../model/user.model.js";


export const getAllEmployeesByCompany = asyncHandler(async (req, res) => {
  const adminId  = req.admin;

  // 1️⃣ Find admin user
  const adminUser = await User.findById(adminId);
  if (!adminUser) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
    });
  }

  // 2️⃣ Get company ID from admin
  const companyId = adminUser.company;
  if (!companyId) {
    return res.status(400).json({
      success: false,
      message: "Admin is not associated with any company",
    });
  }

  // 3️⃣ Find all users (employees) from same company and populate department name
  const employees = await User.find({ company: companyId })
    .select("email department")
    .populate({
      path: "department",
      select: "name", // only fetch the name field from Department
    });

  // 4️⃣ Format data
  const employeeList = employees.map((emp) => ({
    email: emp.email,
    department: emp.department?.name || "N/A",
  }));

  // 5️⃣ Respond
  res.status(200).json({
    success: true,
    count: employeeList.length,
    employees: employeeList,
  });
});
