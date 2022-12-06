import { useSession, signIn, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function SessionedHomePage(props) {
    const { data: session } = useSession();
    return (
        <div>
            <p>You are logged in</p>
            <p>{props.name}</p>
        </div>
    );
}

// const findOrCreateUser = async () => {
//     try {
//         const res = await fetch;
//     } catch (error) {
//         console.log(error);
//     }
// };
