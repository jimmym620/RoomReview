import { signIn } from "next-auth/react";

export default function SessionedHomePage({ userData }) {
    return (
        <div className="body">
            <a href="/reviews">
                <p>Click here to view recent reviews</p>
            </a>

            {/* <p>{userData.name}</p> */}
        </div>
    );
}
