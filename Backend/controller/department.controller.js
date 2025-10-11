import asynchandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

const department = asynchandler(async (req, res) => {
    const userId = req.user;
    
    const user = await User.findById(userId).select("-password");
    if(!user){
        return res.status(404).json({message: "User does not exist."})
    }

    const userDept = await Department.findOne({_id: user.department, company: user.company});

    if(!userDept){
        return res.status(404).json({message: "User does not belong to any department"});
    }

    return res.status(200).json({userDept, message: "Department found successfully."})
})

export default department