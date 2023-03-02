import express from "express";
import { checkVoted } from "../auth/customMiddleware.js";
import { getAllPost, createAllPost, vote ,getSinglePost, getPostComments, createComments, searchItem, updatePost, deletePost} from "../controllers/index.js";
const router = express.Router();

router
  .get("/api/articles", getAllPost)
  .get("/api/articles/:id", getSinglePost)
  .get("/api/articles/:id/comments", getPostComments)
  .get("/api/search/", searchItem)

router
  .post("/api/articles", createAllPost)
  .post("/api/articles/:id/comments", createComments)


router
.put("/api/articles/:id/vote/:direction", vote) //Here Id Must Be Replace By User Email
.put("/api/articles/:id", updatePost)

router
.delete("/api/articles/:id", deletePost)


  

export default router;
