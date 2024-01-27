import express from "express";
import axios from "axios"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { uuid } from 'uuidv4';
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;
const database = 'mongodb://127.0.0.1:27017/WikiFly'

const wikiAPI = axios.create({
    baseURL: 'https://en.wikipedia.org/api/rest_v1/page/summary/',
    headers: {}
  });

const chatgptAPI = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {}
  });

await mongoose.connect(database);

const userSchema = new mongoose.Schema({
    token: String,
    wordQs: [{ id : Number, word: String}]
});

const User = mongoose.model(
  "User",
  userSchema
);

// Query for word wiki summary
app.get("/wordQ", async (req, res) => {
    let word = req.params.word;
    let token = req.params.token;
    let resData = await wikiAPI.get(`/${word}`);

    // User.findOneAndUpdate(
    //     { 'token': token }, // Find the member with the specific token
    //     { $push: { wordQs: {id : 1, word: word} } }, // Append the new wordQ to the workQs array
    //     (err, updatedUser) => {
    //       if (err) {
    //         console.error('Error updating user:', err);
    //         // Handle the error as needed
    //       } else {
    //         console.log('Updated user:', updatedUser);
    //         // Handle the updated user as needed
    //       }
    //     }
    //   );

    res.send(resData.data.extract);
})

//(to be changed) Query for Articles 
app.get("/articleQ", async (req, res) => {
    
})

// create user authorization token for user who hasn't got one
app.get("/auth/tokenReq", async (req, res) => {

    while(true){
        //create new token 
        const newToken = uuid();
        //check for uniqueness in database
        const balls = await User.findOne({ token: newToken});
        //if unique send back to user & create user entry
        if(balls === null){
            res.send(newToken);
            break;
        }
    }
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
  });