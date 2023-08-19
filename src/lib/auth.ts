import { type NextAuthOptions, getServerSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import db from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {    
        session.id = token.id
        session.user!.name = token.name
        session.user!.email = token.email
        session.user!.image = token.picture
      }
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: { email: token.email }
      })
      if (!dbUser) {
        token.id = user!.id
        return token
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async redirect() {
      return '/'
    }
  },
  // debug: process.env.NODE_ENV === 'development',
}

export const getAuthSession = () => getServerSession(authOptions)