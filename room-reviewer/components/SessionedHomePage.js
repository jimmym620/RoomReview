import { useSession, signIn, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function SessionedHomePage({ userData }) {
    const { data: session } = useSession();
    return (
        <div>
            <p>You are logged in</p>
            <p>{userData.name}</p>
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
