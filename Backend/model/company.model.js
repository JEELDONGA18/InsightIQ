import mongoose, {Schema} from "mongoose";

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
},
{
    timestamps: true,
})

companySchema.index({ name: 1 });


export const Company = mongoose.model('Company', companySchema);