import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    basePath: "/auth", // <--- ADD THIS LINE
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string;
                const password = credentials.password as string;

                // 1. Verify against Environment Variables
                if (
                    email === process.env.ADMIN_EMAIL &&
                    password === process.env.ADMIN_PASSWORD
                ) {
                    // 2. Return the user object if valid
                    return { id: "1", name: "Admin", email: email };
                }

                // 3. Return null if invalid
                return null;
            },
        }),
    ],
    callbacks: {
        // Extra security: Strictly allow only the admin email to sign in
        async signIn({ user }) {
            return user.email === process.env.ADMIN_EMAIL;
        },
    },
});