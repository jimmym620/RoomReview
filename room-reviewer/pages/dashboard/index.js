import { getSession } from "next-auth/react";
import ReviewModal from "../../components/ReviewModal";
import EditReviewModal from "../../components/EditReviewModal";
import { useState } from "react";
import Router from "next/router";
import connectMongo from "../../mongoDB/connectDB";
import Review from "../../mongoDB/models/reviewModel";

export default function Index({ result, session }) {
    if (session) {
        return (
            <div>
                <section className="text-center">
                    <h1 className="text-3xl">Dashboard</h1>

                    <div>
                        <p>Your reviews: {result.length}</p>
                        <p>Reviews liked by others: {countLikes(result)}</p>
                        <h2 className="mt-2 text-2xl">Your reviews</h2>
                    </div>
                </section>
                <section className="w-11/12 md:w-1/3 mx-auto">
                    {result.map((review) => {
                        return (
                            <article
                                className="border rounded flex flex-col justify-center py-2"
                                key={review._id}
                            >
                                <h3 className="text-2xl text-center">
                                    Hotel Name:
                                    <span> {review.location}</span>
                                </h3>
                                <EditReviewModal data={review} />
                                <button
                                    className="bg-red-500 border w-1/2 md:w-1/3 m-auto rounded-md text-white mt-1"
                                    onClick={() => {
                                        deleteReview(review._id);
                                        Router.push("/dashboard");
                                    }}
                                >
                                    Delete
                                </button>
                            </article>
                        );
                    })}
                </section>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Sign in to view this page</h3>
            </div>
        );
    }
}

const countLikes = (result) => {
    let numLikes = 0;
    result.forEach((review) => (numLikes += review.upvotedBy.length));
    return numLikes;
};

const deleteReview = async (id) => {
    try {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        await fetch(
            "/api/reviews/requests?" + new URLSearchParams({ reviewId: id }),
            requestOptions
        );
    } catch (error) {
        return console.log(error);
    }
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session) {
        const id = session.user.id;
        let result = {};
        try {
            await connectMongo();
            result = await Review.find({ authorID: id }).lean();
            return {
                props: {
                    result: JSON.parse(JSON.stringify(result)),
                    session,
                },
            };
        } catch (error) {
            console.log(error);
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
    }
}
