/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const demoUsers = [
  {
    id: "1",
    email: "admin@portfolio.com",
    name: "Admin",
    password: "admin123",
    role: "admin",
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
        if (!credentials?.email || !credentials?.password) return null

        const user = demoUsers.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        )

        if (!user) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
})
