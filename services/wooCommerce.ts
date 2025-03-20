import axios from "axios";

const api = axios.create({
  baseURL: "https://wp.dofer.com.mx/wp-json/wc/v3", // Ajusta a tu dominio
  auth: {
    username: process.env.WC_CONSUMER_KEY || "",
    password: process.env.WC_CONSUMER_SECRET || ""
  }
});

export async function getProducts() {
  const { data } = await api.get("/products");
  return data;
}

export async function getProductById(id: string) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}
