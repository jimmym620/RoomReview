import moment from "moment";
import Button from "react-bootstrap/Button";
import { getSession } from "next-auth/react";

import connectMongo from "../../mongoDB/connectDB";
import Review from "../../mongoDB/models/reviewModel";

export default function Index({ results, session }) {
    return (
        <div>
            <h1 className="text-3xl text-center mb-4">Recently Posted</h1>

            {results && (
                <section className="flex flex-col gap-2">
                    {results.map((review) => {
                        return (
                            <article
                                className="md:w-1/2 m-auto border rounded p-4 "
                                key={review._id}
                            >
                                <div>
                                    <h3 className="text-2xl">{review.title}</h3>
                                    <section>
                                        <p>
                                            By <b>{review.author}</b>
                                        </p>
                                        <p>{review.rating} / 5 stars</p>

                                        {session ? ( // IF session exists
                                            review.authorID !==
                                            session.user.id ? ( //IF the post author isn't the the current session user
                                                <div id="upvote-container">
                                                    <Button
                                                        onClick={() => {
                                                            likePost(
                                                                review._id,
                                                                session.user.id
                                                            );
                                                        }}
                                                    >
                                                        {review.upvotedBy.includes(
                                                            session.user.id
                                                        )
                                                            ? "Unlike"
                                                            : "Like"}
                                                    </Button>
                                                </div>
                                            ) : null
                                        ) : null}
                                        <p>{review.upvotedBy.length} upvotes</p>
                                    </section>
                                    <p className="border rounded p-2 my-2">
                                        {review.comment}
                                    </p>

                                    <section>
                                        <div className="flex gap-2">
                                            <p>Date of visit:</p>
                                            <b>
                                                {moment(
                                                    review.dateVisited
                                                ).format("DD/MM/YYYY")}
                                            </b>
                                        </div>
                                        <div className="flex gap-2">
                                            <p>At:</p>
                                            <b>{review.location}</b>
                                        </div>
                                    </section>
                                </div>
                            </article>
                        );
                    })}
                </section>
            )}

            <p className="text-center">
                Want to add a review? Sign up to start posting
            </p>
        </div>
    );
}

const likePost = async (reviewId, userId) => {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: userId }),
    };

    await fetch("/api/reviews/" + reviewId, requestOptions)
        .then(() => {
            window.location.reload();
        })
        .catch((err) => {
            return console.log(err);
        });
};

export async function getStaticProps(context) {
    const session = await getSession(context);
    await connectMongo();
    let results = {};
    try {
        results = await Review.find({}).lean();
    } catch (err) {
        console.log(err);
    }

    return {
        props: { results: JSON.parse(JSON.stringify(results)), session },
    };
}
