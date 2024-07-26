import prisma from "@/lib/dbClient"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

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

        const user = await prisma.user.findUnique({
          where: {
            email: credential.email,
          },
        })

        if (user) {
          const isCorrectPassword = await bcrypt.compare(
            credential.password,
            user.password
          )

          if (isCorrectPassword) {
            return user
          } else {
            return null
          }
        } else {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions

// 125121,citah
