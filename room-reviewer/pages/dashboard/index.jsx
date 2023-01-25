import { useSession, getSession } from "next-auth/react";
import { Button, Modal } from "react-bootstrap";
import ReviewModal from "../../components/ReviewModal";
import { useState } from "react";
import { useRouter } from "next/router";
import connectMongo from "../../mongoDB/connectDB";
import Review from "../../mongoDB/models/reviewModel";
import Link from "next/link";

export default function Index({ result, session }) {
    const { data: status } = useSession();

    const router = useRouter();

    const deleteReview = async (id) => {
        try {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(
                "/api/reviews/requests?" +
                    new URLSearchParams({ reviewId: id }),
                requestOptions
            );
            router.push("/dashboard");
        } catch (error) {
            return console.log(error);
        }
    };

    if (session) {
        return (
            <div>
                <h1 className=" text-center text-3xl">Dashboard</h1>

                <section>
                    <div className="text-center">
                        <h2 className="text-2xl ">Profile Stats</h2>
                        <p>Your reviews: {result.length}</p>
                        <p>Likes: {countLikes(result)}</p>
                    </div>
                    <h2 className="mt-5 text-2xl text-center">Your reviews</h2>
                    {result.map((review) => {
                        return (
                            <article
                                className="text-center my-3"
                                key={review._id}
                            >
                                <h3 className="text-xl">
                                    For:
                                    <span> {review.location}</span>
                                </h3>
                                <a href={"/reviews/edit/" + review._id}>Edit</a>

                                <button
                                    className="border bg-red-500 rounded p-2 text-white"
                                    onClick={() => {
                                        deleteReview(review._id, router);
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
            return console.log(error);
        }
    }
}
