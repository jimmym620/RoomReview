import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    const id = req.query.reviewId;
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
                    res.send(err);
                } else {
                    res.status(200).send({
                        message: "Sucessfully added review",
                    });
                }
            }
        );
    }
    if (req.method === "GET") {
        await connectMongo();
        await Review.find({}, function (error, foundReviews) {
            if (error) {
                res.send(error);
            } else {
                if (foundReviews) {
                    res.send(foundReviews);
                }
            }
        }).clone();
    }
    if (req.method === "PATCH") {
        await connectMongo();
        await Review.updateOne({ _id: id }, { $set: req.body }).then(function (
            err,
            result
        ) {
            if (err) {
                res.send(err);
            }
        });
    } else {
        res.status(401).send("Not authorised");
    }
}
