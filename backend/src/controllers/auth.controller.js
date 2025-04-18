import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/APiError.js"
import {ApiResponse} from "../utils/APIResponse.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";

export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

    if(
      [fullName, email, password].some((field)=>field?.trim() ==="")
    ){
      throw new ApiError(400, 'All fields are required')
    }

    if (password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters long")
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(400, "Email already exists")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).json(new ApiResponse(200, newUser, "User registered successfuly"));

  
})

export const login = asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  if(!email){
    throw new ApiError(400, "email is required")
}

  const user = await User.findOne({ email });

  if(!user)
    throw new ApiError(400, "User doesn't exist.")

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if(!isPasswordCorrect)
    throw new ApiError(401, "Password is wrong")

  generateToken(user._id, res);
  res.status(200).json(new ApiResponse(200, user, "User logged In Successfully"))

})

export const logout = asyncHandler(async(req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

export const updateProfile = asyncHandler(async(req, res) => {
  try {
    const {profilePic} = req.body
    const userId = req.user._id

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);


  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

export const checkAuth= asyncHandler(async(req, res) => {
  try {
    res.status(200).json({user: req.user});
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

