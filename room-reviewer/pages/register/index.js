import SignInForm from "../../components/SignInForm";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";

function Dashboard() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <p>Welcome, {session.user.name}</p>
                {console.log(session)}
                <img
                    src={session.user.image}
                    alt="User Image"
                    style={{ borderRadius: "50px" }}
                />
                <Button
                    onClick={() => {
                        signOut();
                    }}
                >
                    Sign Out
                </Button>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in</p>
                <Button
                    onClick={() => {
                        signIn();
                    }}
                >
                    Sign In
                </Button>
            </div>
        );
    }
}
export default Dashboard;

// <div>
//     <h1>Sign up</h1>
//     {/* <SignInForm /> */}
// </div>
