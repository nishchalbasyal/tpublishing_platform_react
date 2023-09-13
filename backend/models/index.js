import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    featureImg: String,
    category: String,
    author: String,
    slug: {
      type:String,
      unique:true,
    },
    authorEmail: String,
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
 