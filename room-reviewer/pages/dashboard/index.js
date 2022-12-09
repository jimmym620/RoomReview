import { useSession, getSession, signIn, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";

export default function index() {
    const { data: session, status } = useSession();
    if (status === "authenticated") {
        return (
            <div>
                <h1>Dashboard</h1>
                <section id="dashboard">
                    <h2>Your profile</h2>
                    <div>
                        <p>Your reviews:</p>
                        <p>Reviews liked by others:</p>
                    </div>
                    <h2>Your written reviews</h2>
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

export const getServerSideProps = async (context) => {
    return {
        props: {},
    };
};
