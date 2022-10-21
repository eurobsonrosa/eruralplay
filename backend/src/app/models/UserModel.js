import mongoose from "mongoose";

const UserModel = mongoose.model("users", {
    username: {
        type: String,
        required: true        
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false,
    }
})

export default UserModel