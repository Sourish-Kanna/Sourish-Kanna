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
        async redirect({ url, baseUrl }) {
            const adminUrl = new URL("/admin", baseUrl).href;

            if (url === "/" || url === baseUrl) {
                return adminUrl;
            }

            if (url.startsWith("/")) return new URL(url, baseUrl).href;
            return baseUrl;
        },
      },
});