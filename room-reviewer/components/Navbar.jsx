import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import SignOutModalBody from "./SignOutModalBody";
import NavLoginBtn from "./NavLoginBtn";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiCool } from "react-icons/bi";

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
            <nav className=" flex justify-around p-3">
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
        <div className=" w-1/3 md:w-1/6 absolute right-0 p-1 md:p-4 z-10 mt-10 rounded-md bg-tertiary flex flex-col gap-1">
            {session && (
                <>
                    <p className=" text-md text-center ">{session.user.name}</p>
                    <hr className="w-2/3 m-auto h-px  my-1 md:my-2 bg-secondary border-0" />
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
                        <div className="flex m-auto gap-1 items-center">
                            <Link href="/dashboard">Dashboard</Link>
                            <BiCool />
                        </div>
                        <SignOutModalBody session={session} />
                    </>
                ) : (
                    <NavLoginBtn />
                )}
            </div>
        </div>
    );
};
