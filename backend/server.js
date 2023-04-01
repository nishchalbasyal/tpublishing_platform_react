import express, { urlencoded } from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;

app.use(cors({ credentials: true }))


 
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
const db = mongoose.connection
db.on("error",console.error.bind(console, 'MongoDB connection error:'))
db.on("open",()=>{
  console.log(`DataBase Connected SuccessFully`)
})
  
  
 


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", router);



app.listen(port, () => {
  console.log(`Server Is Listening At ${port}`);
});
