import { useSession, getSession } from "next-auth/react";
import Button from "react-bootstrap/Button";
import ReviewModal from "../../components/ReviewModel";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function index({ result }) {
    const { data: session, status } = useSession();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        // console.log("modal: " + showModal);
        setShowModal(true);
        console.log("show clicked");
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (status === "authenticated") {
        return (
            <div>
                <h1>Dashboard</h1>

                <section id="dashboard">
                    <h2>Your profile</h2>
                    <div>
                        <p>Your reviews: {result.length}</p>
                        <p>Reviews liked by others:</p>
                    </div>
                    <h2>Your written reviews</h2>
                    {result.map((review) => {
                        return (
                            <article id="user-reviews-title" key={review._id}>
                                <h3>{review.location}</h3>
                                <Button onClick={handleShowModal}>
                                    Edit review
                                </Button>
                                <Modal
                                    show={showModal}
                                    onHide={handleCloseModal}
                                >
                                    <ReviewModal close={handleCloseModal} />
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
    if (session) {
        try {
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
            return {
                // redirect: {
                //     destination: "/",
                //     statusCode: 307,
                // },
            };
        }
    } else {
        return {
            redirect: {
                destination: "/",
                statusCode: 307,
            },
        };
    }
}
