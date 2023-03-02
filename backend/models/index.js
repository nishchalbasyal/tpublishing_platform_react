import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    comments: [{ 
        type: [],
    }],
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    upvoteIds: {
      type: [],
      default: [],
    },
    
    downvoteIds: {
      type: [],
      default: [],
    },
    created: {
      type: Date,
      default : Date.now(),
      require: true
    }
  });
  
const postModel = new mongoose.model("POST",postSchema)  
export default postModel
 