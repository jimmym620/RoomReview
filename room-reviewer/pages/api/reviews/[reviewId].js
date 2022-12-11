import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    const id = req.query.reviewId;
    console.log(id);
    if (req.method === "GET") {
        // GET SINGULAR REVIEW
        // res.send(reviewId);
    }
    if (req.method === "PATCH") {
        await connectMongo();
        const review = await Review.findOneAndUpdate(
            { _id: id },
            (err, foundReview) => {
                if (err) {
                    res.send(err);
                } else {
                    if (foundReview) {
                        review.save();
                    } else {
                        res.send("Review with id not found");
                    }
                }
            }
        );
    } else {
        res.status(401).send("Not authorised");
    }
}
