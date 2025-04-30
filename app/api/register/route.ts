// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { registerCustomer } from "@/services/wooCommerce";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    // 1. Crear usuario en WooCommerce
    const wooUser = await registerCustomer({
      email,
      first_name: name,
      last_name: "",
      username: email,
      password,
    });

    if (!wooUser || wooUser.code === "registration-error-email-exists") {
      return NextResponse.json({ error: "El email ya está registrado en WooCommerce" }, { status: 400 });
    }

    // 2. Usuario creado con éxito
    return NextResponse.json(
      { message: "Usuario registrado exitosamente en WooCommerce", wooCustomerId: wooUser.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registrando usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
