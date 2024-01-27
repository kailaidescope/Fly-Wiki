import express from "express";
import axios from "axios"
import mongoose from "mongoose";

const app = express();
const port = 3000;
const database = 'mongodb://127.0.0.1:27017/WikiFly'

mongoose.connect(database);

// const usersSchema = new mongoose.Schema({
//     uname: String,
//     password: String,
//     email: String
// });

// const User = mongoose.model(
//   "User",
//   usersSchema
// );

app.get("/", (req, res) => {
    
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
  });