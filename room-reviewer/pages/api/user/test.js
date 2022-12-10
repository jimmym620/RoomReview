import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    const id = req.query.userId;
    if (req.method === "GET") {
        await connectMongo();

        await Review.find({ authorID: id }, function (err, foundReviews) {
            if (err) {
                res.send(err);
            } else res.send(foundReviews);
        }).clone();
    } else {
        res.status(401).send("Not authorised to POST");
    }
}
