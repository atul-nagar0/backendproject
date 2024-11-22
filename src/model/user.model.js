import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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
userschema.pre('save', async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userschema.methods.ispasswordcorrect = async function (password) {
    return bcrypt.compare(password,  this.password);
}

userschema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCES_TOKEN_EXPIRY
        }
    )
}

userschema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userschema)