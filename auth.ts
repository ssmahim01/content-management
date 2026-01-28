/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Demo users - in production, validate against database
const demoUsers = [
  {
    id: "1",
    email: "admin@portfolio.com",
    name: "Admin",
    password: "admin123",
  },
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = demoUsers.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        )

        if (!user) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after login if they go to login page
      if (url.startsWith(baseUrl)) {
        return url
      }
      return baseUrl
    },
  },
})
