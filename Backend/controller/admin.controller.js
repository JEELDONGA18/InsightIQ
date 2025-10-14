import { Company } from "../model/company.model.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

export const admin = async (req, res) => {
  const userId = req.user;
  // console.log("Admin controller accessed", req.user);
  // console.log("User ID from admin:", userId);
  // from userid return user's companies details and all departments related to that company
  const user = await User.findById(userId);
  // const companies = await Company.find({ _id: user.company });
  const departments = await Department.find({ company: user.company }).select(
    "-company -__v"
  );
  console.log("departments found:", departments);
  res.status(200).json({
    departments,
  });
};
