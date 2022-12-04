import { useSession, signOut } from "next-auth/react";

export default function Profile() {
    const { data: session, status } = useSession({ required: true });

    if (status === "authenticated") {
        return (
            <div>
                <p>Welcome {session.user.name}</p>
            </div>
        );
    } else {
        <div>
            <p> You are not signed in</p>
        </div>;
    }
}
