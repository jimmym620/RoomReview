import moment from "moment";
import Button from "react-bootstrap/Button";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Index({ reviews, session }) {
    const router = useRouter();
    return (
        <div>
            <h1>Recently Posted</h1>

            <section>
                {reviews.map((review) => {
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
                                                        router.push("/reviews");
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
    console.log(userId);
    try {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: userId }),
        };
        await fetch(
            "http://localhost:3000/api/reviews/" + reviewId,
            requestOptions
        );
    } catch (error) {
        return console.log(error);
    }
};

export async function getServerSideProps(context) {
    try {
        const response = await fetch(
            "http://localhost:3000/api/reviews/requests"
        );
        const reviews = await response.json();

        return {
            props: {
                session: await getSession(context),
                reviews,
            },
        };
    } catch (error) {
        return console.log(error);
    }
}
