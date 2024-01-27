import express from "express";
import axios from "axios"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { uuid } from 'uuidv4';

const app = express();
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
    workQs: [{ id : Number, word: String}]
});

const User = mongoose.model(
  "User",
  userSchema
);

app.get("/:wordQ", async (req, res) => {
    let wordQ = req.params.wordQ;
    let resData = await wikiAPI.get(`/${wordQ}`);
    res.send(resData.data.extract);
})

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