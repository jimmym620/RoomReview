// POST => Review gets a like

import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    const { reviewId } = req.query;
    const { uid } = req.body;

    if (req.method === "PATCH") {
        await connectMongo();
        try {
            const review = await Review.findOne({ _id: reviewId });
            if (review.upvotedBy.includes(uid)) {
                const index = review.upvotedBy.indexOf(uid);
                review.upvotedBy.splice(index, 1);
            } else {
                review.upvotedBy.push(uid);
            }
            await review.save(function (err) {
                if (err) {
                    return res.send(err);
                } else {
                    return res.status(200).send("Liked");
                }
            });
        } catch (error) {
            return res.send(error);
        }
    } else {
        return res.end("Not authorised");
    }
}
