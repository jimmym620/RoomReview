/* eslint-disable @next/next/no-head-element */
import Link from "next/link";

export default function RootLayout({ children }) {
    return (
        <html>
            <head></head>
            <body>
                <main>
                    <nav>
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/reviews">Reviews</Link>
                        <Link href="/dashboard">My Dashboard</Link>
                    </nav>
                    {children}
                </main>
            </body>
        </html>
    );
}
