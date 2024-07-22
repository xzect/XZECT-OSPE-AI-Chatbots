import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", placeholder: "Email", name: "email" },
        password: {
          label: "password",
          placeholder: "Password",
          name: "password",
        },
      },
      async authorize(credential) {
        if (!credential?.email || !credential?.password) {
          throw Error("All fields are required")
        }

        const user = {
          id: "ok123",
          name: "Ashish Vishwakarma",
          email: "ashisvi7519@gmail.com",
          password: "12341234",
          role: "admin",
          age: 22,
        }

        if (
          credential?.email === user.email &&
          credential?.password === user.password
        ) {
          return user
        }
        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return token
    },
    session: async ({ session, token, user }) => {
      // session.user.role = user.role
      return session
    },
  },
}

export default authOptions
