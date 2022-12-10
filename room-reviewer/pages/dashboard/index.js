import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function index(props) {
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

export async function getServerSideProps(context) {
    try {
        const response = await axios.get(
            "http://localhost:3000/api/user/requests"
        );
        const user = response.data;
        return {
            props: { user },
        };
    } catch (error) {
        redirect("/");
        console.log(error);
    }
}
