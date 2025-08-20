
// /lib/auth.ts

import type { NextAuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

interface ExtendedUser extends User {
  role: string;
}

interface ExtendedJWT extends JWT {
  id: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    /* твои провайдеры */
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as ExtendedUser;
        token.id = u.id;
        token.role = u.role;
      }
      return token as ExtendedJWT;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = (token as ExtendedJWT).id;
        session.user.role = (token as ExtendedJWT).role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};