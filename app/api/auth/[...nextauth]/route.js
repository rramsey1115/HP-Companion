import { db } from "@/lib/connection/db";
import { users } from "@/lib/definitions";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const BASE_PATH = '/api/auth';

export const authOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password", placeholder: "******" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await db.query.users.findFirst({
                    where: eq(users.email, credentials.email),
                });

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        isAdmin: user.isAdmin,
                    };
                }

                return null;
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
            authorization: {
                params: { scope: "read:user user:email" }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    basePath: BASE_PATH,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
