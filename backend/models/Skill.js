import mongoose from "mongoose";

const SkillSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    }
})

export default mongoose.model("Skill", SkillSchema);
