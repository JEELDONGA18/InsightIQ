import asynchandler from "../config/asyncHandler.config.js";
import { Company } from "../model/company.model.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

const company = asynchandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Company name is required" });
  }

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Admin email and password are required" });
  }

  const isExistingCompany = await Company.find({ name });
  console.log(isExistingCompany);

  if (isExistingCompany.length > 0) {
    return res.status(409).json({ message: "Company already exists" });
  }

  const isExistingCompanyUser = await User.find({ email });
  if (isExistingCompanyUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  const newCompany = await Company.create({ name });
  const admin = await Department.create({
    name: "Admin",
    description: `Admin department for ${name}`,
    company: newCompany._id,
  });

  const adminUser = await User.create({
    email,
    password,
    department: admin._id,
    company: newCompany._id,
  });

  return res.status(201).json({
    message: "Company created successfully",
    company: newCompany,
    adminDepartment: admin,
    adminId: adminUser._id,
  });
});

export default company;
