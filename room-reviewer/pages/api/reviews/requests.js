import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    if (req.method === "POST") {
        connectMongo();
        await Review.create(
            {
                title: req.body.title,
                rating: req.body.rating,
                dateVisited: req.body.dateVisited,
                comment: req.body.comment,
            },
            function (err) {
                if (err) {
                    res.status(err);
                } else {
                    res.status(200).redirect("/");
                }
            }
        );
    }
    if (req.method === "GET") {
        connectMongo();
        Review.find({}, function (error, foundReviews) {
            if (error) {
                res.status(error).send(error);
            } else {
                if (foundReviews) {
                    console.log("review found");
                    res.json(foundReviews);
                }
            }
        });
    }
}
