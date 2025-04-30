// services/wooCommerce.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://wp.dofer.com.mx/wp-json/wc/v3", // Asegúrate de que esta URL es correcta para tu WooCommerce
  auth: {
    username: process.env.WC_CONSUMER_KEY || "",
    password: process.env.WC_CONSUMER_SECRET || "",
  },
  // Las claves se pasan en cada solicitud a través de params, sin quedar hardcodeadas en cada función
  params: {
    consumer_key: process.env.WC_CONSUMER_KEY,
    consumer_secret: process.env.WC_CONSUMER_SECRET,
  },
});

// ================== Pedidos ==================

/**
 * Obtiene el estado de un pedido por su ID.
 * @param orderId - ID del pedido a consultar.
 */
export async function getOrderStatus(orderId: string) {
  const endpoint = `/orders/${orderId}`;
  console.log("Requesting endpoint:", api.defaults.baseURL + endpoint);
  try {
    const { data } = await api.get(endpoint);
    if (!data || Object.keys(data).length === 0) {
      console.warn(`No se encontró información para el pedido ${orderId}`);
      return null;
    }
    return data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(`Pedido ${orderId} no encontrado (404)`);
      return null;
    }
    console.error("Error fetching order status:", error);
    return null;
  }
}

/**
 * Crea un nuevo pedido en WooCommerce.
 * @param orderData - Objeto con los datos del pedido a crear.
 * @returns Los datos del pedido creado o null en caso de error.
 */
export async function createOrder(orderData: any) {
  try {
    console.log("🔔 Enviando a WooCommerce:", JSON.stringify(orderData, null, 2));
    const { data } = await api.post("/orders", orderData);
    return data;
  } catch (error: any) {
    // Si viene respuesta de Woo, la capturamos
    const wooErr = error.response?.data;
    console.error("❌ Error creating order:", wooErr || error.message);
    // Lanza el objeto completo para que el route.ts lo reciba
    throw wooErr || new Error(error.message);
  }
}

// ================== Pedidos (opcional) ==================

export async function getOrders() {
  const { data } = await api.get("/orders");
  return data;
}

// ================== Productos ==================

export async function getProducts() {
  const { data } = await api.get("/products");
  return data;
}

export async function getProductById(id: string) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function createProduct(productData: any) {
  const { data } = await api.post("/products", productData);
  return data;
}

export async function updateProduct(id: string, productData: any) {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
}

export async function deleteProduct(id: string) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

// ================== Categorías ==================

export async function getCategories() {
  const { data } = await api.get("/products/categories");
  return data;
}

export async function getCategoryById(id: string) {
  const { data } = await api.get(`/products/categories/${id}`);
  return data;
}

export async function createCategory(categoryData: any) {
  const { data } = await api.post("/products/categories", categoryData);
  return data;
}

export async function updateCategory(id: string, categoryData: any) {
  const { data } = await api.put(`/products/categories/${id}`, categoryData);
  return data;
}

export async function deleteCategory(id: string) {
  const { data } = await api.delete(`/products/categories/${id}`);
  return data;
}

interface WooCustomerPayload {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

export async function registerCustomer(payload: WooCustomerPayload) {
  try {
    const { data } = await api.post("/customers", payload);
    return data;
  } catch (error: any) {
    const wooError = error.response?.data;
    console.error("Error creando usuario WooCommerce:", wooError || error.message);
    return wooError || null; // así puedes detectar `code: "registration-error-email-exists"`
  }
}

interface WooLoginResponse {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

export async function loginWoo(email: string, password: string) {
  try {
    console.log("🚀 Llamada a loginWoo con:", { email, password });
    const { data } = await axios.post("https://wp.dofer.com.mx/wp-json/jwt-auth/v1/token", {
      username: email,
      password,
    });
    console.log("✅ Respuesta de WooCommerce:", data);
    return data;
  } catch (error: any) {
    console.error("❌ loginWoo error:", error.response?.data || error.message);
    return null;
  }
}


export async function getCustomerOrdersWithToken(token: string) {
  try {
    const { data } = await axios.get("https://wp.dofer.com.mx/wp-json/wc/v3/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    console.error("Error obteniendo pedidos con token JWT:", error.response?.data || error.message);
    return null;
  }
}

export async function getWooCustomer(email: string) {
  try {
    const { data } = await api.get("/customers", {
      params: { email },
    });
    
    // data es un array; si existe al menos un cliente, devolvemos el primero
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error: any) {
    console.error("Error obteniendo datos del cliente (me):", error.response?.data || error.message);
    return null;
  }
}

export async function updateCustomerBilling(email: string, billing: any, wooToken: string) {
  // Normalizar el objeto billing
  const normalizedBilling = {
    first_name: billing.first_name || "",
    last_name: billing.last_name || "",
    address_1: billing.address_1 || "",
    address_2: billing.address_2 || "",
    city: billing.city || "",
    state: billing.state || "",
    postcode: billing.postcode || "",
    country: billing.country || "",
    phone: billing.phone || ""
  };

  // Validar campos obligatorios
  const requiredFields = ["first_name", "last_name", "address_1", "city", "postcode", "country"];
  for (const field of requiredFields) {
    if (!normalizedBilling[field as keyof typeof normalizedBilling]) {
      throw new Error(`El campo ${field} es obligatorio.`);
    }
  }

  // Buscar al cliente por email usando la instancia "api" que tiene las credenciales (consumer key/secret)
  const searchRes = await api.get("/customers", {
    params: { email },
  });
  const foundCustomers = searchRes.data;
  if (!Array.isArray(foundCustomers) || foundCustomers.length === 0) {
    throw new Error("No se encontró el cliente con ese email");
  }
  const customerId = foundCustomers[0].id;

  // Actualizar la dirección de facturación del cliente
  const response = await api.put(`/customers/${customerId}`, { billing: normalizedBilling });
  return response.data;
}

