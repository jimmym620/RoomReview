import axios from "axios";
import {
    useSession,
    unstable_getServerSession,
    getSession,
} from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Button from "react-bootstrap/Button";

export default function index() {
    const { data: session, status } = useSession();
    if (status === "authenticated") {
        return (
            <div>
                <h1>Dashboard</h1>
                <section id="dashboard">
                    <h2>Your profile</h2>
                    {/* <p>{props.user}</p> */}
                    <div>
                        <p>Your reviews:</p>
                        <p>Reviews liked by others:</p>
                    </div>
                    <h2>Your written reviews</h2>
                    <Button onClick={() => callAPI(session.user.id)}>
                        call
                    </Button>
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
    console.log(
        axios.get("http://localhost:3000/api/user/requests", {
            params: {
                userId: id,
            },
        })
    );
};

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });

    try {
        const response = await axios.get(
            "http://localhost:3000/api/user/requests",
            {
                params: {
                    userId: session.id,
                },
            }
        );
        const user = response.data;

        return {
            props: { user },
        };
    } catch (error) {
        console.log(error);
        return {
            redirect: {
                destination: "/",
                statusCode: 307,
            },
        };
    }
}
