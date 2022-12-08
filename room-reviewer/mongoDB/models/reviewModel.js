import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    upvotes: Number,
    // datePosted: Date.now(),
    dateVisited: Date,
    author: String,
    authorID: String,
});

// Check if models exists
module.exports =
    mongoose.models.Review || mongoose.model("Review", reviewSchema);
