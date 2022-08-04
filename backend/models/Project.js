import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description : {
        type: String,
    },
    skills: {
        type: [String],
      },
})

export default mongoose.model("Project", ProjectSchema);
