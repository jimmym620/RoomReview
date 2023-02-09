import connectMongo from "../../../mongoDB/connectDB";
import Review from "../../../mongoDB/models/reviewModel";

export default async function handler(req, res) {
    await connectMongo();
    if (req.method === "POST") {
        await Review.create({
            title: req.body.title,
            rating: req.body.rating,
            dateVisited: req.body.dateVisited,
            comment: req.body.comment,
            location: req.body.location,
            author: req.body.author,
            authorID: req.body.authorID,
        }).then(function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res
                    .status(200)
                    .send({ message: "Successfully created post" });
            }
        });
    } else if (req.method === "GET") {
        await Review.find({}).then(function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return result;
            }
        });
        // .lean();
    } else if (req.method === "PATCH") {
        const id = req.query.reviewId;
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
        const id = req.query.reviewId;
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
