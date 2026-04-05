import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    basePath: "/auth",
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string;
                const password = credentials.password as string;

                if (
                    email === process.env.ADMIN_EMAIL &&
                    password === process.env.ADMIN_PASSWORD
                ) {
                    return { id: "1", name: "Admin", email: email };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            return user.email === process.env.ADMIN_EMAIL;
        },
        async redirect({ url }) {
            // If successful login, force go to /admin regardless of baseUrl detection
            if (url.includes("/signin") || url.includes("/auth")) {
                return "/admin";
            }
            // Allow internal relative redirects
            if (url.startsWith("/")) return url;
            return "/";
        },
      },
});