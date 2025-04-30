import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginWoo } from "@/services/wooCommerce"; // Asegúrate de que la ruta es correcta
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales WooCommerce",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // Llamada a la función loginWoo para autenticar contra WooCommerce
        const woo = await loginWoo(credentials.email, credentials.password);
        if (!woo || !woo.token) {
          console.log("❌ Token faltante o respuesta inválida de WooCommerce:", woo);
          return null;
        }
        
        // Retornamos los datos del usuario con el token de WooCommerce
        return {
          id: woo.user_email,
          name: woo.user_display_name,
          email: woo.user_email,
          wooToken: woo.token,
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.wooToken = user.wooToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.wooToken = token.wooToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
