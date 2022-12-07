import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    posts: [],
    upvotes: Number,
});

// Check if models exists
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
