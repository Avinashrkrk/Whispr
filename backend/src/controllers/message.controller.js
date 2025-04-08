import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import Message from "../models/message.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;  

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
            .select("-password");

        res.status(200).json(new ApiResponse(200, filteredUsers, "Fetched users"));
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage = asyncHandler(async(req, res) => {
    try {
        const { id : userToChat } = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChat},
                {senderId:userToChat, receiverId: myId}
            ]
        })

        res.status(200).json(new ApiResponse(200, messages, "Messages Fetched successfully"))
    } catch (error) {
        console.error("Error in getMessage:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
})

export const sendMessage = asyncHandler(async(req, res) => {
    try {
        const {text, image} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

        let imageUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
      
        await newMessage.save()
      
        // const receiverSocketId = getReceiverSocketId(receiverId)
        // if (receiverSocketId) {
        //   io.to(receiverSocketId).emit("newMessage", newMessage)
        // }
    
        res.status(201).json(new ApiResponse(201, newMessage, "Message sent Successfully"))
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
})
