// Archivo: next-auth.config.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { loginWoo } from "@/services/wooCommerce";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credenciales WooCommerce",
      // Opcional: puedes agregar id: "credentials"
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log("⚠️ No credentials received");
          return null;
        }

        console.log("🔐 Iniciando login con Woo para:", credentials.email);
        console.log("🟡 Password recibido:", credentials.password);

        const woo = await loginWoo(credentials.email, credentials.password);
        console.log("📦 Respuesta de loginWoo:", woo);

        if (!woo) {
          console.log("❌ Respuesta nula de loginWoo");
          return null;
        }
        
        if (!woo.token) {
          console.log("❌ Token faltante en la respuesta:", woo);
          return null;
        }

        return {
          id: woo.user_email,
          name: woo.user_display_name,
          email: woo.user_email,
          wooToken: woo.token,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.wooToken = user.wooToken; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.wooToken = token.wooToken;
      }
      return session;
    },
  },
};
