import connectMongo from "../../../mongoDB/connectDB";
import User from "../../../mongoDB/models/userModel";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await connectMongo;

        res.status(200).json({ name: "John Smith" });
    } else {
        res.status(401).send("Not authorised to POST");
    }
}
