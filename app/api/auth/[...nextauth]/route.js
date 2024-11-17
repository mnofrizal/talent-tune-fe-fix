import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_ENDPOINTS } from "@/config/api";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          if (data.success) {
            // Fetch user data from /me endpoint
            const meRes = await fetch(API_ENDPOINTS.AUTH.ME, {
              headers: {
                Authorization: `Bearer ${data.data.accessToken}`,
              },
            });

            if (meRes.ok) {
              const userData = await meRes.json();
              return {
                ...userData.data,
                accessToken: data.data.accessToken,
              };
            }

            return {
              ...data.data.user,
              accessToken: data.data.accessToken,
            };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          nip: user.nip,
          systemRole: user.systemRole,
          jabatan: user.jabatan,
          bidang: user.bidang,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export { handler as GET, handler as POST };
