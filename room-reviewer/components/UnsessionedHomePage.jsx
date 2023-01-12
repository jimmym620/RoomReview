import { signIn } from "next-auth/react";

function UnsessionedHomePage() {
    return (
        <div>
            <a href="" onClick={signIn}>
                <p>Click here to sign in</p>
            </a>
        </div>
    );
}
export default UnsessionedHomePage;
