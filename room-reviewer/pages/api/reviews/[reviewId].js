// POST => Review gets a like

import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    const { reviewId } = req.query;
    const { uid } = req.body;

    if (req.method === "PATCH") {
        await connectMongo();
        await Review.findOneAndUpdate(
            { _id: reviewId },
            { $addToSet: { upvotedBy: uid } }
        ).then(function (err) {
            if (err) {
                return res.json(err);
            } else {
                console.log("upvoted");
                return res.status(200);
            }
        });
    }
}
