import { Schema, model, models } from "mongoose";
import User from "./userModel";

const reviewSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    body: { type: String },
    upvotes: Number,
    datePosted: Date.now(),
    dateOfVisit: Date,
    author: { type: Schema.Types.ObjectId, ref: "User" },
});

// Check if models exists
const Review = models.review || model("Review", reviewSchema);

export default Review;
