import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: String,
    password: { type: String },
});

// Check if models exists
const testUser = models.testUser || model("testUser", userSchema);

export default testUser;
