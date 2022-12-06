import SessionedHomePage from "../components/SessionedHomePage";
import axios from "axios";

import { useSession, signIn, signOut } from "next-auth/react";
import UnsessionedHomePage from "../components/UnsessionedHomePage";
export default function index(props) {
    const { data: session } = useSession();

    return (
        <div>
            <h1>Home page</h1>
            {/* {session ? <SessionedHomePage /> : <UnsessionedHomePage />} */}
            <SessionedHomePage />
            <p>{props.user.name}</p>
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const response = await axios.get("http://localhost:3000/api/user/get");
        const user = response.data;

        return {
            props: { user },
        };
    } catch (error) {
        console.log(error);
    }
}
