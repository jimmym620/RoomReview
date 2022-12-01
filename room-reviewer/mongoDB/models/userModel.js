import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String },
});

// Check if models exists
const testUser = models.testUser || model("testUser", userSchema);

export default testUser;
