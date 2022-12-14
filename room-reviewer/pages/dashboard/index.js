import { useSession, getSession } from "next-auth/react";
import Button from "react-bootstrap/Button";
import ReviewModal from "../../components/ReviewModal";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";

export default function index({ result }) {
    const { data: session, status } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const router = useRouter();
    // const [numOfLikes, setNumOfLikes] = useState(0);
    let numOfLikes = 0;

    if (status === "authenticated") {
        return (
            <div>
                <h1>Dashboard</h1>

                <section id="dashboard">
                    <div id="stats">
                        <h2>Profile Stats</h2>
                        <p>Your reviews: {result.length}</p>
                        <p>Reviews liked by others: {countLikes(result)}</p>
                    </div>
                    <h2>Your reviews</h2>
                    {result.map((review) => {
                        numOfLikes += review.upvotes;
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
                                        try {
                                            deleteReview(review._id);
                                            router.push("/dashboard");
                                        } catch (error) {
                                            return console.log(error);
                                        }
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
            "http://localhost:3000/api/reviews/requests?" +
                new URLSearchParams({ reviewId: id }),
            requestOptions
        );
    } catch (error) {
        return console.log(error);
    }
};

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (session) {
        try {
            // GET user info
            const user = await fetch(
                "http://localhost:3000/api/user/requests?" +
                    new URLSearchParams({
                        userId: session.user.id,
                    })
            );
            const result = await user.json();

            return {
                props: { result },
            };
        } catch (error) {
            return console.log(error);
        }
    }
}
