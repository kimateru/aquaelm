export interface ProductVariant {
  id: string;
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  category: "From the sea" | "From the land" | "Gifts and Others";
  origin: string;
  species: string;
  pearl_size: string;
  appearance: string;
  taste: string;
  texture: string;
  description: string;
  images: string[];
  product_variants: ProductVariant[];
}
