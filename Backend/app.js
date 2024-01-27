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

//mongoose.connect(database);

// const usersSchema = new mongoose.Schema({
//     uname: String,
//     password: String,
//     email: String
// });

// const User = mongoose.model(
//   "User",
//   usersSchema
// );

app.get("/:wordQ", async (req, res) => {
    let wordQ = req.params.wordQ;
    let resData = await wikiAPI.get(`/${wordQ}`);
    res.send(resData.data.extract);
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
  });