import mongoose, {Schema} from "mongoose";
import { Company } from "./company.model.js";

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    }
},
{
    timestamps: true,
})

departmentSchema.index({ name: 1, company: 1 }, { unique: true });


export const Department = mongoose.model('Department', departmentSchema);