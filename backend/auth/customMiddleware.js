import mongoose from "mongoose";
import postModel from "../models/index.js";

export const checkVoted = async (req,res, next) =>{
    const id = req.params.id || []
    console.log(id)
    const post =  await postModel.findById(id);
    if ( post.upvoteIds.includes(id) || post.downvoteIds.includes(id)) {
      res.json({ message: "Already Voted" });
    }
    next()
  }