import type { Product } from "./types";

const PLACEHOLDER_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK8oc65wz7qGKYJ8Fbn_-xiVevmV2uFegtc6xucvsD20SUHmF8HuNmqvo&s=10";

export const PRODUCTS: Product[] = [
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    title: "BELUGA XX",
    category: "From the sea",
    origin: "China",
    species: "Huso huso",
    pearl_size: "3.3–3.5 mm",
    appearance: "Lighter grey with pronounced marbling.",
    taste: "Low salinity with marine mineral and cream.",
    texture: "Silk texture.",
    description:
      "China · Huso huso. Pearl size 3.3–3.5 mm. Lighter grey with pronounced marbling. Low salinity with marine mineral and cream. Silk texture.",
    images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    product_variants: [
      { id: "v1", weight: "30g", price: 225.0 },
      { id: "v2", weight: "50g", price: 375.0 },
      { id: "v3", weight: "100g", price: 750.0 },
      { id: "v4", weight: "125g", price: 937.5 },
      { id: "v5", weight: "200g", price: 1500.0 },
      { id: "v6", weight: "250g", price: 1875.0 },
      { id: "v7", weight: "500g", price: 3750.0 },
      { id: "v8", weight: "1000g", price: 7500.0 },
    ],
  },
  {
    id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
    title: "IMPERIAL OSETRA",
    category: "From the sea",
    origin: "Iran",
    species: "Acipenser gueldenstaedtii",
    pearl_size: "2.9–3.2 mm",
    appearance: "Amber gold with warm hues.",
    taste: "Rich nuttiness with toasted oak notes.",
    texture: "Firm and popping texture.",
    description:
      "Iran · Acipenser gueldenstaedtii. Pearl size 2.9–3.2 mm. Amber gold with warm hues. Rich nuttiness with toasted oak notes. Firm and popping texture.",
    images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    product_variants: [
      { id: "v4", weight: "30g", price: 180.0 },
      { id: "v5", weight: "50g", price: 290.0 },
      { id: "v6", weight: "125g", price: 710.0 },
    ],
  },
  {
    id: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f",
    title: "ROYAL SEVRUGA",
    category: "From the sea",
    origin: "Bulgaria",
    species: "Acipenser stellatus",
    pearl_size: "2.0–2.5 mm",
    appearance: "Platinum grey.",
    taste: "Intense marine salinity with iodine.",
    texture: "Creamy and melting texture.",
    description:
      "Bulgaria · Acipenser stellatus. Pearl size 2.0–2.5 mm. Platinum grey. Intense marine salinity with iodine. Creamy and melting texture.",
    images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    product_variants: [
      { id: "v7", weight: "30g", price: 130.0 },
      { id: "v8", weight: "50g", price: 210.0 },
      { id: "v9", weight: "125g", price: 520.0 },
    ],
  },
];
