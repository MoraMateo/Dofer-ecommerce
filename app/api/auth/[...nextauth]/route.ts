// app/api/auth/[...nextauth]/route.ts
"use server"

import NextAuth from "next-auth/next";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginWoo } from "@/services/wooCommerce";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { email, password } = credentials;

        // 1. Autenticar contra WooCommerce
        const wooData = await loginWoo(email, password);
        if (!wooData?.token) return null;

        // 2. Asegurar existencia en Prisma
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: wooData.user_display_name || "",
              passwordHash: await bcrypt.hash(password, 10),
            },
          });
        } else {
          const match = user.passwordHash
            ? await bcrypt.compare(password, user.passwordHash)
            : false;
          if (!match) {
            await prisma.user.update({
              where: { id: user.id },
              data: { passwordHash: await bcrypt.hash(password, 10) },
            });
          }
        }

        // 3. Retornar datos para sesión
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          token: wooData.token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User & { token?: string } }) {
      if (user) {
        token.id = user.id;
        if (user.token) token.wooToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      if (token.wooToken) session.user.wooToken = token.wooToken as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
