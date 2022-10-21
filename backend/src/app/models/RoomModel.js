import mongoose from "mongoose";

const RoomModel = mongoose.model("rooms", {
    videoUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export default RoomModel