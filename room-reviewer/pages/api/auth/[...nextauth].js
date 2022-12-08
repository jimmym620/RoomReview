import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

//Providers
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
    adapter: MongoDBAdapter(clientPromise),
    session: {
        maxAge: 60 * 60 * 24 * 2, // 2 days
        updateAge: 24 * 60 * 60, // 24 hours --- How frequently to extend a session
    },
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.uid;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
};
export default NextAuth(authOptions);
