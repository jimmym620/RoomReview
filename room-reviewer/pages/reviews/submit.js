import ReviewSubmitForm from "../../components/ReviewSubmitForm";
import { useSession, signIn } from "next-auth/react";

export default function SubmitReview() {
    const { data: session, status } = useSession();
    if (status === "authenticated") {
        return (
            <div>
                <ReviewSubmitForm />
            </div>
        );
    } else {
        return (
            <div className="w-1/2 m-auto p-2">
                <p> Want to contribute by adding a review? Sign in below.</p>
                <button
                    className=" p-2 text-white border mt-2 rounded bg-blue-500 hover:bg-blue-400"
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
