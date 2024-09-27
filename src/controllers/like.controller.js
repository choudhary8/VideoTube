import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Video } from "../models/video.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId,userId} = req.params
    //TODO: toggle like on video
    //check for parameter validation
    //check for video and user
    //create a like with videoId and userId
    //return the response

    if(!videoId||!userId){
        throw new ApiError(400,"All parameters required")
    }

    const video=await Video.findById(videoId);
    if(!video){
        throw new ApiError(400,"Credentials wrong")
    }

    const user=await User.findById(userId);
    if(!user){
        throw new ApiError(400,"Credentials wrong")
    }

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}