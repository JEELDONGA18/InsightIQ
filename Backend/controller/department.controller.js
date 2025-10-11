import asynchandler from "../config/asyncHandler.config.js";
import { Department } from "../model/department.model.js";
import { User } from "../model/user.model.js";

const department = asynchandler(async (req, res) => {
    const userId = req.user;
    
    const user = await User.findById(userId).select("-password");
    if(!user){
        return res.status(409).json({message: "User isn't exists."})
    }

    const department = await Department.find({_id: user.department, company: user.company});

    if(!department){
        return res.status().josn({message: "User is not belonging with any department"});
    }

    return res.status(200).json({department, message: "Department found successfully."})
})

export default department