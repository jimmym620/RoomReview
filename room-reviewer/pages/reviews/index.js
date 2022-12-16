import moment from "moment";
import Button from "react-bootstrap/Button";
import { getSession, useSession } from "next-auth/react";
import Review from "../../mongoDB/models/reviewModel";
import connectMongo from "../../mongoDB/connectDB";

export default function Index({ results }) {
    const { data: session } = useSession();
    return (
        <div>
            <h1>Recently Posted</h1>

            <section>
                {results.map((review) => {
                    return (
                        <article className="review" key={review._id}>
                            <div id="main-container">
                                <h3 id="title">{review.title}</h3>
                                <section>
                                    <p>
                                        By <b>{review.author}</b>
                                    </p>
                                    <p id="rating">{review.rating} / 5 stars</p>

                                    {session ? ( // IF session exists
                                        review.authorID !== session.user.id ? ( //IF the post author isn't the the current session user
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
                                    <p>{review.upvotedBy.length}</p>
                                </section>
                                <p id="comment">{review.comment}</p>

                                <section>
                                    <div>
                                        <p>Date of visit:</p>
                                        <b>
                                            {moment(review.dateVisited).format(
                                                "DD/MM/YYYY"
                                            )}
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

    await fetch(
        process.env.SITE_URL + "/api/reviews/" + reviewId,
        requestOptions
    )
        .then(() => {
            window.location.reload();
        })
        .catch((err) => {
            return console.log(err);
        });
};

// export async function getServerSideProps(context) {
//     context.res.setHeader(
//         "Cache-Control",
//         "public, s-maxage=10, stale-while-revalidate=59"
//     );
//     const requestOptions = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };
//     try {
//         const response = await fetch(
//             process.env.SITE_URL + "/api/reviews/requests",
//             requestOptions
//         );
//         const reviews = await response.json();

//         return {
//             props: {
//                 reviews,
//             },
//         };
//     } catch (error) {
//         return console.log(error);
//     }
// }

export async function getServerSideProps(context) {
    await connectMongo();
    const results = await Review.find({}, function (error, foundReviews) {
        if (error) {
            return;
        } else {
            return JSON.parse(JSON.stringify(foundReviews));
        }
    })
    .clone();

    return {
        props: { results },
    };
}
