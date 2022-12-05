import { useSession, getSession } from "next-auth/react";

export default function index() {
    const {data: session, status} = useSession();
    if (status === 'authenticated'){
        return (
            <div>
                <p>Welcome {session.user.name}</p>
                <Button
                    onClick={() => {
                        signOut();
                    }}
                >
                    Sign Out
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                <p> You are not signed in</p>
            </div>
        );
    }
}
