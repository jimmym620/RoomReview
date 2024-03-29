import { useSession, signOut, getSession } from "next-auth/react";

export default function Profile() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <div>
                <p>Welcome {session.user.name}</p>
                <button
                    onClick={() => {
                        signOut();
                    }}
                >
                    Sign Out
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <p> You are not signed in</p>
            </div>
        );
    }
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }
    return {
        props: { session },
    };
};
