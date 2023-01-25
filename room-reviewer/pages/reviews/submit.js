import ReviewSubmitForm from "../../components/ReviewSubmitForm";
import { useSession, signIn } from "next-auth/react";
import Button from "react-bootstrap/Button";

export default function SubmitReview() {
    const { data: session, status } = useSession();
    if (status === "authenticated") {
        return (
            <div>
                <h1 className="text-2xl text-center">Add a review</h1>
                <ReviewSubmitForm />
            </div>
        );
    } else {
        return (
            <div className="text-center">
                <p> You must have an account to post reviews</p>
                <button
                    className="underline text-blue-500"
                    onClick={() => {
                        signIn();
                    }}
                >
                    Sign In
                </button>
            </div>
        );
    }
}
