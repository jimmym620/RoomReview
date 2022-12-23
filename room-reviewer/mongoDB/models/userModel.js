import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
});

// Check if models exists
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
