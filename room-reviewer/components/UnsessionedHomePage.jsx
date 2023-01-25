import { signIn } from "next-auth/react";
import Link from "next/link";

function UnsessionedHomePage() {
    return (
        <div>
            <Link href="" onClick={signIn}>
                <p>Click here to sign in</p>
            </Link>
            <Link href="/reviews">
                <p>View recent reviews</p>
            </Link>
        </div>
    );
}
export default UnsessionedHomePage;
