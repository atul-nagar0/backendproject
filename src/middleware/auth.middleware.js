import { asyncHandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model";
import { ApiError } from "../utils/ApiErrors";

export const verifyJWT = asyncHandler(async(req, _,next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(400, "Unautherized Request")
    }        

    const decodeddata = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodeddata?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }

    req.user = user;
    next()
})