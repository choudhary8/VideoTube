import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    //validate if video is valid?
    //find all the comments for given video
    //validate the comments
    //send comments in res

    const video=await Video.findById(videoId);
    if(!video){
        throw new ApiError(400,"Invalid video")
    }

    const comments=await Comment.find({video:videoId});
    if(!comments){
        throw new ApiError(201,"No commets found")
    }

    return res.status(200).json(
        new ApiResponse(200,comments,"Comments fetched successfully")
    )
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    //get all the details from req
    //validate all the details
    //check if user and video exists
    //create comment in db
    //check if comment is created
    //return res

    const {content}=req.body;
    const userId=req.user._id;
    const videoId=req.params;
    if(!content||!videoId){
        throw new ApiError(400,"Invalid entry")
    }

    const user=await User.findById(userId);
    const video=await Video.findById(videoId);
    if(!user||!video){
        throw new ApiError(400,"Unauthrize request")
    }

    const comment=await Comment.create({
        content,
        video:videoId,
        owner:userId
    })
    if(!comment){
        throw new ApiError(500,"Error while inseting the comment in db")
    }

    return res.status(201).json(
        new ApiResponse(200,comment,"Comment created successfully")
    )

    
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment

    //get details from req
    //validate the details
    //find the comment in db
    //update the comment
    //save the comment in db
    //return res

    const commentId=req.params;
    const {content}=req.body;
    if(!commentId||!content){
        throw new ApiError(400,"All details are required")
    }

    const comment=await Comment.findByIdAndUpdate(
        commentId,
        {
            $set:{
                content
            }
        }
    );
    if(!comment){
        throw new ApiError(400,"Invalid comment")
    }

    return res.status(200).json(
        new ApiResponse(200,comment,"Comment updated successfully")
    )
    
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    //Get credentials from req
    //validate the credentials
    //delete the comment
    //return res

    const commentId=req.params;
    if(!commentId){
        throw new ApiError(400,"Unauthorize request")
    }

    await Comment.deleteOne(commentId);

    return res.status(200).json(
        new ApiResponse(200,"Comment deleted successfully")
    )
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
