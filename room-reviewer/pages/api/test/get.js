import connectMongo from "../../../mongoDB/connectDB";
import userModel from "../../../mongoDB/models/userModel";

export default async function getUser(req, res) {
    try {
        await connectMongo();
        const userList = await userModel.find();

        res.json(userList);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}
