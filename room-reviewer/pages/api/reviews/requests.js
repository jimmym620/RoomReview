import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    const id = req.query.reviewId;
    await connectMongo();
    if (req.method === "POST") {
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
                    return res.send(err);
                } else {
                    return res
                        .status(200)
                        .send({ message: "Successfully created post" });
                }
            }
        );
    } else if (req.method === "GET") {
        await Review.find({}, function (error, foundReviews) {
            if (error) {
                return res.send(error);
            } else {
                if (foundReviews) {
                    return res.status(200).send(foundReviews);
                }
            }
        }).clone();
    } else if (req.method === "PATCH") {
        await Review.updateOne({ _id: id }, { $set: req.body }).then(function (
            err,
            result
        ) {
            if (err) {
                return res.send(err);
            } else {
                return res
                    .status(200)
                    .send({ message: "Review Edited" })
                    .redirect("/dashboard");
            }
        });
    } else if (req.method === "DELETE") {
        await Review.deleteOne({ _id: id }).then(function (err) {
            if (err) {
                return res.send(err);
            } else {
                return res.status(200).send({ message: "Delete Successful" });
            }
        });
    } else {
        return res.status(500).end();
    }
}
