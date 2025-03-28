// services/wooCommerce.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://wp.dofer.com.mx/wp-json/wc/v3", // Ajusta a tu dominio de WooCommerce
  auth: {
    username: process.env.WC_CONSUMER_KEY || "",
    password: process.env.WC_CONSUMER_SECRET || "",
  },
});

// ================== Pedidos ==================

/**
 * Obtiene el estado de un pedido por su ID.
 * @param orderId - ID del pedido a consultar
 */
export async function getOrderStatus(orderId: string) {
  const endpoint = `/orders/${orderId}`;
  console.log("Requesting endpoint:", api.defaults.baseURL + endpoint);

  try {
    const { data } = await api.get(endpoint);
    // Si data viene vacío o no contiene información, retornamos null
    if (!data || Object.keys(data).length === 0) {
      console.warn(`No se encontró información para el pedido ${orderId}`);
      return null;
    }
    return data;
  } catch (error: any) {
    // Si se recibe un 404, no lanzamos error y retornamos null
    if (error.response && error.response.status === 404) {
      console.warn(`Pedido ${orderId} no encontrado (404)`);
      return null;
    }
    // Para otros errores, logueamos y retornamos null
    console.error("Error fetching order status:", error);
    return null;
  }
}

// Ejemplo de más funciones para pedidos (opcional):
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
