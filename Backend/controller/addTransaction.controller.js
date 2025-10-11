import asynchandler from "../config/asyncHandler.config.js";
import Transaction from "../model/transaction.model.js";
import { User } from "../model/user.model.js";

const transaction = asynchandler(async (req, res) => {
  const user = req.user;
  const { amount, type } = req.body;

  const date = req.body.date || new Date();

  if(!amount || !type){
    return res.status(400).json({message: "Amount or type is missing."})
  }

  const userDepartment = await User.findById(user).select("department");

  if (!userDepartment) {
    return res.status(404).json({ message: "User's department not found." });
  }

  const trans = await Transaction.create({
    department: userDepartment,
    amount,
    type,
    date
  })

  return res.status(200).json({
    message: "Transaction added successfully",
    trans
  })
});

export default transaction;
