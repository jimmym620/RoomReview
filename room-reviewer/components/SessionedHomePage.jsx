import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SessionedHomePage({ userData }) {
    return (
        <div className="body">
            <Link href="/reviews">
                <p>View recent reviews</p>
            </Link>

            {/* <p>{userData.name}</p> */}
        </div>
    );
}
