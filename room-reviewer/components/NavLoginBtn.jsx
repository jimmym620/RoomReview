import { signIn } from "next-auth/react";

export default function NavLoginBtn() {
    return (
        <button
            className="block bg-neutral text-white p-2 m-auto  focus:ring-4 focus:outline-none font-medium rounded text-center "
            onClick={() => signIn()}
        >
            Login
        </button>
    );
}
