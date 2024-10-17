import NextAuth, { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { API_URL } from "@/app/common/Constants"
import { toast } from "react-toastify"

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.tokens.refresh}`,
    },
  })

  const response = await res.json()
  return {
    ...token,
    tokens: response,
  }
}

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

      //Se o token de acesso tiver válido, retorna o token
      if (new Date().getTime() < token.tokens.expiresIn) {
        return token
      }

      //Se não tiver válido, verifica se tem refreshToken
      return await refreshToken(token)
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
