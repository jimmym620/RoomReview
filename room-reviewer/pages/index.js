import SessionedHomePage from "../components/SessionedHomePage";

import { useSession } from "next-auth/react";
import UnsessionedHomePage from "../components/UnsessionedHomePage";
export default function Index() {
    const { data: session } = useSession();

    return (
        <div className="homepage-container">
            <h1>Welcome</h1>

            {session ? <SessionedHomePage /> : <UnsessionedHomePage />}
        </div>
    );
}
