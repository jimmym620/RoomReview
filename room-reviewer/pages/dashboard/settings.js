import { useSession, getSession, signIn, signOut } from "next-auth/react";

export default function Settings() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <div>
                <h1>Profile Settings</h1>
                <section id="settings">
                    <h2>Your Settings</h2>
                    <div>
                        {/* <p>Your reviews:</p>
                        <p>Reviews liked by others:</p> */}
                    </div>
                    <h2>Your written reviews</h2>
                </section>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Sign in to view this page</h3>
            </div>
        );
    }
}
