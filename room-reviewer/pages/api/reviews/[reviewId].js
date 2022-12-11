import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { reviewId } = req.query;
        await connectMongo();
        await Review.findOne({});

        res.send(reviewId);
    } else {
        res.status(401).send("Not authorised");
    }
}
