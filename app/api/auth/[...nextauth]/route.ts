import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
// Importamos la función de login a WooCommerce:
import { loginWoo } from "@/services/wooCommerce";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email:    { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const email = credentials.email;
        const password = credentials.password;

        // 1. Autenticar contra WooCommerce via JWT
        const wooData = await loginWoo(email, password);
        if (!wooData || !wooData.token) {
          // Credenciales inválidas en WooCommerce
          return null;
        }

        // 2. Si éxito, garantizar que el usuario existe en Prisma
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          // Crear usuario nuevo en DB local si no existe
          user = await prisma.user.create({
            data: {
              email: email,
              name: wooData.user_display_name || "", 
              // Guardamos el password hasheado localmente por si se requiere (opcional)
              passwordHash: await bcrypt.hash(password, 10)
            }
          });
        } else {
          // Si el usuario ya existe en Prisma, podemos actualizar su hash si la contraseña cambió
          const passwordMatches = user.passwordHash 
            ? await bcrypt.compare(password, user.passwordHash) 
            : false;
          if (!passwordMatches) {
            // Actualizar hash de contraseña local si es distinto (por ejemplo, usuario cambió pass en WooCommerce)
            await prisma.user.update({
              where: { id: user.id },
              data: { passwordHash: await bcrypt.hash(password, 10) }
            });
          }
        }

        // 3. Retornar datos de usuario para la sesión NextAuth
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          // Adjuntamos el token JWT de WooCommerce para usarlo luego en la sesión
          token: wooData.token
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/signin"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      // Si es login inicial, incorporar datos del usuario
      if (user) {
        token.id = user.id;
        // Guardar el token JWT de WooCommerce en el JWT de NextAuth
        token.wooToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasar id y token de WooCommerce al objeto de sesión
      if (token) {
        session.user.id = token.id as string;
        if (token.wooToken) {
          session.user.wooToken = token.wooToken as string;
        }
      }
      return session;
    }
  }
};

// Exportar los handlers para NextAuth (métodos GET y POST)
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
