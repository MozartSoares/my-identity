import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { API_URL } from "@/app/common/Constants"
import { toast } from "react-toastify"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "ex: joao.silva@gmail.com",
        },
        password: {
          label: "Senha",
          type: "password",
          placeholder: "ex: 123",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        const { username, password } = credentials
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
        if (response.status == 401) {
          toast.error("Usuário ou senha inválidos")
          return null
        }
        const user = await response.json()

        return response.ok && user ? user : null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user }
      return token
    },
    async session({ token, session }) {
      session.user = token.user
      session.tokens = token.tokens
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
