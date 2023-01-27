import { signIn } from "next-auth/react";

export default function NavLoginBtn() {
    return (
        <button
            className="block text-white w-1/4 m-auto bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => signIn()}
        >
            Login
        </button>
    );
}
