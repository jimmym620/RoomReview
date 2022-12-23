import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating: { type: Number },
    comment: { type: String },
    location: { type: String, required: true },
    upvotedBy: [String],
    dateVisited: Date,
    author: String,
    authorID: String,
});

// Check if models exists
module.exports =
    mongoose.models.Review || mongoose.model("Review", reviewSchema);
