import { useSession, getSession } from "next-auth/react";
import Button from "react-bootstrap/Button";
import ReviewModal from "../../components/ReviewModal";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function index({ result }) {
    const { data: session, status } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

    if (status === "authenticated") {
        return (
            <div>
                <h1>Dashboard</h1>

                <section id="dashboard">
                    <h2>Profile</h2>
                    <div>
                        <p>Your reviews: {result.length}</p>
                        <p>Reviews liked by others:</p>
                    </div>
                    <h2>Your reviews</h2>
                    {result.map((review) => {
                        return (
                            <article id="user-reviews-title" key={review._id}>
                                <h3>
                                    Your review for{" "}
                                    <span>{review.location}</span>{" "}
                                </h3>
                                <Button
                                    onClick={() => {
                                        setShowModal(true);
                                        setModalData(review);
                                    }}
                                >
                                    Edit review
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

const callAPI = (id) => {
    console.log(id);
};

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });

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
        console.log(error);
    }
}
