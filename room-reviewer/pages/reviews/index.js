import moment from "moment";

import { getSession } from "next-auth/react";

import connectMongo from "../../mongoDB/connectDB";
import Review from "../../mongoDB/models/reviewModel";

export default function Index({ results, session }) {
    return (
        <div className="">
            <h1 className="text-center text-3xl">Recently Posted</h1>

            {results && (
                <section className="flex flex-col gap-2 w-1/2 m-auto">
                    {results.map((review) => {
                        return (
                            <article className="border" key={review._id}>
                                <div id="main-container">
                                    <h3 id="title">{review.title}</h3>
                                    <section>
                                        <p>
                                            By <b>{review.author}</b>
                                        </p>
                                        <p id="rating">
                                            {review.rating} / 5 stars
                                        </p>

                                        {session ? ( // IF session exists
                                            review.authorID !==
                                            session.user.id ? ( //IF the post author isn't the the current session user
                                                <div id="upvote-container">
                                                    <button
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
                                                    </button>
                                                </div>
                                            ) : null
                                        ) : null}
                                        <p>{review.upvotedBy.length}</p>
                                    </section>
                                    <p id="comment">{review.comment}</p>

                                    <section>
                                        <div>
                                            <p>Date of visit:</p>
                                            <b>
                                                {moment(
                                                    review.dateVisited
                                                ).format("DD/MM/YYYY")}
                                            </b>
                                        </div>
                                        <div>
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

            <p>Want to add a review? Sign up to start posting</p>
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
