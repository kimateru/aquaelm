import { PRODUCTS } from "../data/products";

export async function fetchProducts() {
  return { data: PRODUCTS, isFallback: false };
}

export async function fetchProductById(id) {
  const product = PRODUCTS.find((p) => p.id === id) ?? null;
  return { data: product, isFallback: false };
}
