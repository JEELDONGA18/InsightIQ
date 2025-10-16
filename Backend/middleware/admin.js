import asynchandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

const isAdmin = asynchandler(async (req, res, next) => {
      const userId = req.user; // ID of currently logged-in user (from auth middleware)
    
      // Check if user exists
      const user = await User.findById(userId).select("-password");
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

      req.admin = user
      next();
})

export default isAdmin;