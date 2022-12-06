import mongoose from "mongoose";
import express from "express";

const app = express();

// const connectMongo = async () => mongoose.connect(process.env.MONGO_URI);
const connectMongo = async () =>
    mongoose.connect("mongodb://localhost:27017", (err) => {
        if (!err) {
            console.log("Connected successfully to 27017");
        }
    });

export default connectMongo;
