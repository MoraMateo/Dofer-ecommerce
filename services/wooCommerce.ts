import axios from "axios";

const api = axios.create({
  baseURL: "https://wp.dofer.com.mx/wp-json/wc/v3", // Ajusta a tu dominio
  auth: {
    username: process.env.WC_CONSUMER_KEY || "",
    password: process.env.WC_CONSUMER_SECRET || ""
  }
});

/* ======== Productos ======== */

/**
 * Obtiene la lista de productos.
 */
export async function getProducts() {
  const { data } = await api.get("/products");
  return data;
}

/**
 * Obtiene un producto por su ID.
 * @param id - ID del producto
 */
export async function getProductById(id: string) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

/**
 * Crea un nuevo producto.
 * @param productData - Objeto con la información del producto a crear.
 */
export async function createProduct(productData: any) {
  const { data } = await api.post("/products", productData);
  return data;
}

/**
 * Actualiza un producto existente.
 * @param id - ID del producto a actualizar.
 * @param productData - Objeto con los datos actualizados.
 */
export async function updateProduct(id: string, productData: any) {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
}

/**
 * Elimina un producto.
 * @param id - ID del producto a eliminar.
 */
export async function deleteProduct(id: string) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

/* ======== Categorías ======== */

/**
 * Obtiene la lista de categorías de productos.
 */
export async function getCategories() {
  const { data } = await api.get("/products/categories");
  return data;
}

/**
 * Obtiene una categoría por su ID.
 * @param id - ID de la categoría.
 */
export async function getCategoryById(id: string) {
  const { data } = await api.get(`/products/categories/${id}`);
  return data;
}

/**
 * Crea una nueva categoría.
 * @param categoryData - Objeto con la información de la categoría a crear.
 */
export async function createCategory(categoryData: any) {
  const { data } = await api.post("/products/categories", categoryData);
  return data;
}

/**
 * Actualiza una categoría existente.
 * @param id - ID de la categoría a actualizar.
 * @param categoryData - Objeto con los datos actualizados.
 */
export async function updateCategory(id: string, categoryData: any) {
  const { data } = await api.put(`/products/categories/${id}`, categoryData);
  return data;
}

/**
 * Elimina una categoría.
 * @param id - ID de la categoría a eliminar.
 */
export async function deleteCategory(id: string) {
  const { data } = await api.delete(`/products/categories/${id}`);
  return data;
}
