import connectMongo from "../../../mongoDB/connectDB";
import userModel from "../../../mongoDB/models/userModel";

export default async function addUser(req, res) {
    try {
        console.log("COnnecting to Mongo");
        await connectMongo();
        console.log("CONECTED to Mongo");
        console.log("creating document");
        const user = await userModel.create(req.body);
        console.log("document created");

        res.json({ user });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
