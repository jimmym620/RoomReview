import { signIn } from "next-auth/react";

export default function SessionedHomePage({ userData }) {
    return (
        <div className="body">
            <a href="/reviews">
                <p>View recent reviews</p>
            </a>

            {/* <p>{userData.name}</p> */}
        </div>
    );
}
