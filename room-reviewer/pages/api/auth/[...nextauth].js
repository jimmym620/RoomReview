import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.G_CLIENT_ID,
            clientSecret: process.env.G_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    session: {
        maxAge: 60 * 60 * 24 * 2, // 2 days
        updateAge: 24 * 60 * 60, // 24 hours --- How frequently to extend a session
    },
};
export default NextAuth(authOptions);
