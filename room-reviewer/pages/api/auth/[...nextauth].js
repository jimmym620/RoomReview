import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import connectMongo from "../../../mongoDB/connectDB";
import User from "../../../mongoDB/models/userModel";

//Providers
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

//Compare hashed passwords

const comfirmPasswordHash = (plainPassword, hashedPassword) => {
    return new Promise((resolve) => {
        bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
            resolve(res);
        });
    });
};

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.G_CLIENT_ID,
            clientSecret: process.env.G_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email address",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    await connectMongo();
                    const user = await User.findOne({
                        email: credentials.email,
                    });

                    if (user !== null) {
                        const res = await comfirmPasswordHash(
                            credentials.password,
                            user.password
                        );
                        if (res === true) {
                            userAccount = {
                                email: user.email,
                                name: user.name,
                            };
                            return userAccount;
                        } else {
                            console.log("Hash not matched");
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.log("Authorise error", error);
                }
            },
        }),
        // ...add more providers here
    ],

    secret: process.env.NEXT_PUBLIC_SECRET,
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
