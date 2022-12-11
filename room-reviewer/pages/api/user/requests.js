import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    const id = req.query.userId;
    if (req.method === "GET") {
        await connectMongo();
        await Review.find({ authorID: id }).then(function (err, foundReviews) {
            if (err) {
                res.send(err);
            } else {
                if (foundReviews) {
                    res.send(foundReviews);
                } else {
                    res.send("No reviews found for this user");
                }
            }
        });

        //non GET requests
    } else {
        res.status(401).send("Not authorised");
    }
}
