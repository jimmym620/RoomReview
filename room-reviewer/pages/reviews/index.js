import moment from "moment";
import Button from "react-bootstrap/Button";
import { useSession } from "next-auth/react";

export default function Index({ reviews }) {
    const { data: session, status } = useSession();
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
                                    <div id="upvote-container">
                                        <Button
                                            onClick={() => {
                                                likePost(
                                                    review._id,
                                                    session.user.id
                                                );
                                            }}
                                        >
                                            Like
                                        </Button>
                                        <p>{review.upvotedBy.length}</p>
                                    </div>
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
    // console.log(reviewId, userId);
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
        console.log(error);
    }
};

export async function getServerSideProps() {
    try {
        const reviews = await fetch(
            "http://localhost:3000/api/reviews/requests"
        ).then((res) => {
            return res.json();
        });

        return {
            props: { reviews },
        };
    } catch (error) {
        console.log(error);
    }
}
