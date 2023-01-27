import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import SignOutModalBody from "./SignOutModalBody";
import NavLogoutBtn from "./NavLogoutBtn";
import NavLoginBtn from "./NavLoginBtn";

function NavigationBar() {
    const { data: session, status } = useSession();
    const [modalOpen, setModalOpen] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false); // true - open, false- closed

    return (
        <>
            <nav className="bg-emerald-500 flex justify-around p-3">
                <a href="/">
                    <h1 className="text-2xl">Room Reviewer</h1>
                </a>
                <div className="hidden md:flex my-auto gap-4 font-medium">
                    <a href="/reviews"> Reviews</a>
                    <a href="/reviews/submit">Submit </a>
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
                                <a href="/reviews">Reviews</a>
                                <a href="/reviews/submit">Create</a>
                            </div>

                            <a href="/dashboard">Dashboard</a>
                            {/* if user is authenticated, render sign in or out button */}
                            {session === "authenticated" ? (
                                <SignOutModalBody />
                            ) : (
                                <NavLoginBtn />
                            )}
                        </div>
                    </div>
                )}
            </nav>
            {/* <Modal show={showState} onHide={() => setShowState(false)}>
                <SignOutModalBody showStateChanger={setShowState} />
            </Modal> */}
        </>
    );
}
export default NavigationBar;
