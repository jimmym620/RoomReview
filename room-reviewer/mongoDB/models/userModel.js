import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    posts: [],
    upvotes: Number,
});

// Check if models exists
const User = models.user || model("User", userSchema);

export default User;
