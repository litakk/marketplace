import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import type { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";
import type { NextAuthOptions } from "next-auth";
const prisma = new PrismaClient();

interface ExtendedUser {
  id: string;
  email: string;
  name: string | null;
  role?: string | null;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const passwordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (!passwordCorrect) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? null,
          role: user.role ?? null, // если есть роль в базе
        } as ExtendedUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
    newUser: "/",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | ExtendedUser }) {
      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              role: "USER",
            },
          });

          token.id = String(newUser.id);
          token.role = newUser.role;
        } else {
          token.id = String(existingUser.id);
          token.role = existingUser.role;
        }
      }
      console.log("JWT CALLBACK: ", { token, user });

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("SESSION CALLBACK: ", { session, token });

      if (token?.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // редирект на главную после входа
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
