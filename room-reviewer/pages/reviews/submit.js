import ReviewSubmitForm from "../../components/ReviewSubmitForm";
import { useSession, signIn } from "next-auth/react";
import Button from "react-bootstrap/Button";

export default function SubmitReview() {
    const { data: session, status } = useSession();
    if (status === "authenticated") {
        return (
            <div>
                <h1>Add a review</h1>
                <ReviewSubmitForm />
            </div>
        );
    } else {
        return (
            <div>
                <p> Want to contribute by adding a review? Sign in below.</p>
                <Button
                    onClick={() => {
                        signIn();
                    }}
                >
                    Sign In
                </Button>
            </div>
        );
    }
}
