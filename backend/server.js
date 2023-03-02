import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;


 
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
const db = mongoose.connection
db.on("error",console.error.bind(console, 'MongoDB connection error:'))
db.on("open",()=>{
  console.log(`DataBase Connected SuccessFully`)
})
  
  
 



app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server Is Listening At ${port}`);
});
