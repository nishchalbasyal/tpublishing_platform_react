import { application } from "express";
import postModel from "../models/index.js";
import express from "express";
 

const app = express();

export const getAllPost = async (req, res) => {
  try {
    const data = await postModel.find({});
    res.status(200).json(data);
  } catch (e) {
    res.status(501).json({ message: e.message });
  }
};

export const createAllPost = async (req, res) => {
   const newPost = new postModel(req.body);


  try {
    await newPost.save().then(() => {
      console.log("Data SuccessFully Saved");
      res.status(201).json(newPost);
    });
  } catch (e) {
    res.status(501).json({ message: e.message });
  }
  
 
};

export const getSinglePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findById({ _id: id });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getCategory = async (req, res) => {
  const categoryID = req.params.category;
  try {
    const post = await postModel.findById({ category: categoryID });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPostComments = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findById(id).sort({ "comments.created": -1 });
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createComments = async (req, res) => {
  const id = req.params.id;
  const {text} = req.body
   try {
      await postModel.updateOne({_id:id},{$push:{comments:{postedBy:id,text:text}}})
      const post = await postModel.findById(id).sort({ "comments.created": -1 });
      res.status(200).json(post.comments);
     
  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const searchItem = async (req, res) => {
  try {
    const query = req.query.q;
    const results = await postModel.find({ $or: [
      { title: { $regex: query, $options: 'i' } },
      { content: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } },
    ]}).sort({ created: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
export const vote = async (req, res) => {
  const id = req.params.id;
  const articleId = req.body.articleId;
  const direction = req.params.direction;

  const validDirections = ["up", "down"];
  if (!validDirections.includes(direction)) {
    res.status(400).json({ message: "Invalid vote direction" });
    return;
  }

  const query = { _id: articleId };
  const update = {};
  const voteField = direction === "up" ? "upvotes" : "downvotes";
  const voteIdsField = direction === "up" ? "upvoteIds" : "downvoteIds";

  const post = await postModel.findById(articleId);
  if (post[voteIdsField].includes(id)) {
    res.status(400).json({ message: "Already voted" });
    return;
  }

  update.$inc = { [voteField]: 1 };
  update.$addToSet = { [voteIdsField]: id };

  if (direction === "up") {
    update.$pull = { downvoteIds: id };
    if (post.downvoteIds.includes(id)) {
      update.$inc.downvotes = -1;
    }
  } else {
    update.$pull = { upvoteIds: id };
    if (post.upvoteIds.includes(id)) {
      update.$inc.upvotes = -1;
    }
  }

  const options = { new: true };
  try {
    const updatedData = await postModel.findOneAndUpdate(
      query,
      update,
      options
    );
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// To Update Article
export const  updatePost = async (req,res)=>{ 

  const id = req.params.id;

  const update = {};
  if (req.body.title) {
    update.title = req.body.title;
   }
  if (req.body.title) {
    update.summary = req.body.summary;
   }
  if (req.body.content) {
    update.content = req.body.content;
 
  }
  if (req.body.featureImg) {
    update.featureImg = req.body.featureImg;
 
  }
  if (req.body.category) {
    update.category = req.body.category;
 
   }

  
  
  const options = { new: true, upsert: true };
  try {
    const updatedData = await postModel.findOneAndUpdate({ _id: id }, { $set: update }, options);
    res.json(updatedData);
    console.log(`Post Updated SuccessFully`)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  
}



export const deletePost = async (req, res) => {

    const id = req.params.id;
    try {
      const deletedPost = await postModel.findByIdAndDelete(id);
      if (!deletedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}