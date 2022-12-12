import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    const id = req.query.userId;
    if (req.method === "GET") {
        await connectMongo();
        await Review.find({ authorID: id }).then(function (err, foundReviews) {
            if (err) {
                return res.json(err);
            } else {
                if (foundReviews) {
                    return res.status(200).send(foundReviews);
                }
            }
        });

        //non GET requests
    } else {
        return res.json({ message: "Not authorised" });
    }
}
