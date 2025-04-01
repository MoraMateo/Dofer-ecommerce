// next-auth.d.ts
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  // 1) Extiende la interfaz 'User' si regresas campos personalizados en authorize()
  interface User {
    id?: string;
    wooToken?: string;
  }

  // 2) Extiende la interfaz 'Session' para que session.user incluya tus campos
  interface Session {
    user: {
      id?: string;
      wooToken?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  // 3) Extiende la interfaz 'JWT' para que puedas añadir wooToken, etc.
  interface JWT {
    id?: string;
    wooToken?: string;
  }
}
