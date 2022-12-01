import connectMongo from "../../../mongoDB/connectDB";
import userModel from "../../../mongoDB/models/userModel";

export default async function registerUser(req, res) {
    try {
        await connectMongo();

        const user = await userModel.create(req.body);
        console.log("document created");

        res.json({ user });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
