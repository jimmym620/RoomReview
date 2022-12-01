import mongoose from "mongoose";
import express from "express";

const app = express();

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI);

export default connectMongo;
