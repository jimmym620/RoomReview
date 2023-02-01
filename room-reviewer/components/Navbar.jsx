import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import SignOutModalBody from "./SignOutModalBody";
import NavLoginBtn from "./NavLoginBtn";
import Link from "next/link";
import { useRouter } from "next/router";

function NavigationBar() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [burgerOpen, setBurgerOpen] = useState(false); // true - open, false- closed

    useEffect(() => {
        if (burgerOpen) {
            setBurgerOpen(false);
        }
    }, [router]);

    return (
        <>
            <nav className="bg-emerald-500 flex justify-around p-3">
                <Link href="/">
                    <h1 className="text-2xl">Room Reviewer</h1>
                </Link>
                <div className="hidden md:flex my-auto gap-4 font-medium">
                    <Link href="/reviews"> Reviews</Link>
                    <Link href="/reviews/submit">Submit </Link>
                </div>
                <button
                    className=" p-2 text-xl"
                    onClick={() => setBurgerOpen(!burgerOpen)}
                >
                    <BiMenu />
                </button>

                {burgerOpen && <BurgerNav session={session} />}
            </nav>
        </>
    );
}
export default NavigationBar;

const BurgerNav = ({ session }) => {
    return (
        <div className=" w-1/3 md:w-1/4 absolute right-0 p-1 z-10 mt-10 rounded-sm bg-emerald-400 flex flex-col gap-1">
            {session && (
                <>
                    <p className=" text-sm text-center ">{session.user.name}</p>
                    <hr className="w-2/3 m-auto h-px  my-1 md:my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                </>
            )}

            <div className="flex flex-col text-center gap-1 md:gap-2 text-lg">
                <div className="flex flex-col md:hidden">
                    <Link href="/reviews">All Reviews</Link>
                    <Link href="/reviews/submit">Submit review</Link>
                </div>

                {/* if user is authenticated, render sign in or out button */}
                {session ? (
                    <>
                        <Link href="/dashboard">Dashboard</Link>
                        <SignOutModalBody session={session} />
                    </>
                ) : (
                    <NavLoginBtn />
                )}
            </div>
        </div>
    );
};
