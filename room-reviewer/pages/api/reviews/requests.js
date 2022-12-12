import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    if (req.method === "POST") {
        console.log(req.body);
        await connectMongo();
        await Review.create(
            {
                title: req.body.title,
                rating: req.body.rating,
                dateVisited: req.body.dateVisited,
                comment: req.body.comment,
                location: req.body.location,
                author: req.body.author,
                authorID: req.body.authorID,
            },
            function (err) {
                if (err) {
                    return res.json(err);
                } else {
                    return res
                        .status(200)
                        .send({ message: "Successfully created post" });
                }
            }
        );
    } else if (req.method === "GET") {
        await connectMongo();
        await Review.find({}, function (error, foundReviews) {
            if (error) {
                return res.json(error);
            } else {
                if (foundReviews) {
                    return res.status(200).send(foundReviews);
                }
            }
        }).clone();
    } else if (req.method === "PATCH") {
        const id = req.query.reviewId;
        await connectMongo();
        await Review.updateOne({ _id: id }, { $set: req.body }).then(function (
            err,
            result
        ) {
            if (err) {
                return res.json(err);
            } else {
                return res.status(200).send({ message: "Review Edited" });
            }
        });
    } else {
        return res.json({ message: "Not authorised" });
    }
}
