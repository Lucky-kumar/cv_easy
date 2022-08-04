import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    image: {
        type: String,
    },
    phone: {
        type: Number,
    },
    skills: {
        type : [String],
    },
    projects: {
        type : [String],
    },
})

export default mongoose.model("User", UserSchema);
