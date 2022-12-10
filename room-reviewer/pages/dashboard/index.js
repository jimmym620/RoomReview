import {
    useSession,
    getSession,
} from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Button from "react-bootstrap/Button";

export default function index(props) {
    const { data: session, status } = useSession();
    if (status === "authenticated") {
        return (
            <div>
                <h1>Dashboard</h1>
                <section id="dashboard">
                    <h2>Your profile</h2>
                    <div>
                        <p>Your reviews: {props.result.length}</p>
                        <p>Reviews liked by others:</p>
                    </div>
                    <h2>Your written reviews</h2>
                    <Button onClick={() => callAPI(props)}>call</Button>
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

export async function getServerSideProps({ req }, context) {
    const session = await getSession({ req });

    try {
        const user = await fetch("http://localhost:3000/api/user/requests?" + new URLSearchParams({
            userId: session.user.id,
        })
        );
        const result = await user.json()

        return {
            props: {result}
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
}
