import mongoose, { Schema } from "mongoose";

const userschema  = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    watchhistory: [
        {
        type: Schema.Types.ObjectId,
        ref: "Video"
        }
    ],
    avatar: {
        type: String,  //cloudinary url
        required: true
    },
    coverimage: {
        type: String //cloudinary url

    },
    password: {
        type: String,
        required: [true, 'password is required']

    },
    refreshtoken: {
        type: String
    }
    
},
{timestamps: true}
)

export const User = mongoose.model("User", userschema)