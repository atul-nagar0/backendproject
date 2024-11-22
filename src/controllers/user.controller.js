import {User} from '../model/user.model.js'
import {ApiError} from '../utils/ApiErrors.js'
import { asyncHandler } from '../utils/asynchandler.js';
import {uploadoncloudinary} from '../utils/clouinary.js'
import {Apiresponse} from '../utils/Apiresponse.js'

const generateAccessandRefreshtoken = async (userid)  =>{
    try{
    
    const user = await User.findById(userid)
    console.log(user)
    const accessToken = await user.generateAccessToken(); //refreshToken and accessToken cantains the jwt string 
    const refreshToken = await user.generateRefreshToken();

    user.refreshtoken = refreshToken;

    await user.save({ validateBeforeSave: false }); //when don't wnats to change other fields
    
    return {accessToken, refreshToken};
}
    catch(error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}



const RegisterUser = asyncHandler(async (req, res)=>{
    const {username,  fullname, email, password} = req.body
    const ifexists = await User.findOne({username})
    
    if ([username,  fullname, email, password].some((field)=> //if any element passed the test(callback) it will returns true
        field?.trim() === "")){
            throw new ApiError(400, "All Fields Required")
        }
    
    if (ifexists) {
        throw new ApiError(400, "Account  with username already  exists");
    }

    const avatarLocalPath = req.files.avatar?.[0].path;
    // if req.files then access avatar[0]  if it the  access path from it
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    
    const coverImageLocalPath = req.files.coverimage?.[0];
    let coverImage;
    
    if (coverImageLocalPath) {
        coverImage = await uploadoncloudinary(coverImageLocalPath.path)
    }

    const avatar =  await uploadoncloudinary(avatarLocalPath)
    
    if(!avatar){
        throw new ApiError(400, "Avatar File is Required")
    }
    
    

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //by default query selects all by adding -password will not show in output
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new Apiresponse(200, createdUser, "User registered Successfully")
    )

})

const LoginUser = asyncHandler( async (req, res)=>{

    const {username, email, password} = req.body;
    // res.send(username)
    if (!(username || email)) {
        throw new ApiError(400, "Email or Username is required for login")
    }

    const user = await User.findOne({
        $or:[{username}, {email}]
    })
    
    console.log(user.username)
    
    
    if(!user){
        throw new ApiError(400, `No User Found With ${username} Username.`)
    }

    const ispasswordvalid = user.ispasswordcorrect(password);

    if(!ispasswordvalid){
        throw new ApiError(400, "Your password is Wrong");
    }
    
    const {accessToken, refreshToken} =  await generateAccessandRefreshtoken(user._id);
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    
    return res.
    cookie("accessToken", accessToken, options).
    cookie("refreshToken", refreshToken, options).
    json(
        new Apiresponse(200,
            {
            user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully")
    )

})

const logOut = asyncHandler(async (req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new Apiresponse(200, {}, "User logged Out"))
  })





export  {RegisterUser, LoginUser, logOut}