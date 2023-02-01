import { signIn, getSession } from "next-auth/react";
import { Button, Modal } from "react-bootstrap";
import ReviewModal from "../../components/ReviewModal";
import { useState } from "react";
import Router from "next/router";
import connectMongo from "../../mongoDB/connectDB";
import Review from "../../mongoDB/models/reviewModel";

export default function Index({ result, session }) {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

    if (session) {
        return (
            <div className="">
                <section className="text-center">
                    <h1 className="text-3xl">Dashboard</h1>

                    <div id="stats">
                        <p>Your reviews: {result.length}</p>
                        <p>Reviews liked by others: {countLikes(result)}</p>
                        <h2 className="mt-2 text-2xl">Your reviews</h2>
                    </div>
                </section>
                {result.map((review) => {
                    return (
                        <article id="user-reviews-title" key={review._id}>
                            <h3>
                                Hotel Name:
                                <span> {review.location}</span>
                            </h3>
                            <Button
                                onClick={() => {
                                    setShowModal(true);
                                    setModalData(review);
                                }}
                            >
                                Edit review
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    deleteReview(review._id);
                                    Router.push("/dashboard");
                                }}
                            >
                                Delete
                            </Button>
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                            >
                                <ReviewModal
                                    close={() => setShowModal(false)}
                                    id={modalData._id}
                                    title={modalData.title}
                                    location={modalData.location}
                                    rating={modalData.rating}
                                    dateVisited={modalData.dateVisited}
                                    comment={modalData.comment}
                                />
                            </Modal>
                        </article>
                    );
                })}
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
