import { useSession, signIn, signOut } from "next-auth/react";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import SignOutModalBody from "./SignOutModalBody";
import Link from "next/link";

function NavigationBar() {
    const { data: session, status } = useSession();
    const [showState, setShowState] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false); // true - open, false- closed

    return (
        <>
            <nav className="bg-green-200 flex justify-around p-3">
                <Link href="/">
                    <h1 className="text-2xl">Room Reviewer</h1>
                </Link>

                <div className="hidden md:flex my-auto gap-4 font-medium">
                    <Link href="/reviews"> Reviews</Link>
                    <Link href="/reviews/submit">Submit </Link>
                </div>

                <button
                    className=" p-2"
                    onClick={() => setBurgerOpen(!burgerOpen)}
                >
                    <BiMenu />
                </button>
                {burgerOpen && (
                    <div className="w-1/3 absolute right-0 p-1 z-10 mt-12 rounded-sm bg-green-100 flex flex-col">
                        <div className="flex flex-col text-center">
                            <div className="flex flex-col md:hidden">
                                <Link href="/reviews">Reviews</Link>
                                <Link href="/reviews/submit">Create</Link>
                            </div>

                            <Link href="/dashboard">Dashboard</Link>
                            {/* if user is authenticated, render sign in or out button */}
                            <LoginLogoutBtn
                                signIn={signIn}
                                status={status}
                                setShowState={setShowState}
                            />
                        </div>
                    </div>
                )}
            </nav>
            <Modal show={showState} onHide={() => setShowState(false)}>
                <SignOutModalBody showStateChanger={setShowState} />
            </Modal>
        </>
    );
}
export default NavigationBar;

// for md+ screen sizes
const LoginLogoutBtn = ({ status, signIn, setShowState }) => {
    return (
        <>
            {status === "authenticated" ? (
                <button
                    onClick={() => {
                        setShowState(true);
                        // signOut({ callbackUrl: "/" });
                    }}
                >
                    Logout
                </button>
            ) : (
                <button onClick={() => signIn()}>Login</button>
            )}
        </>
    );
};
