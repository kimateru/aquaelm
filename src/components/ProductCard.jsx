import { Link } from "react-router-dom";
import ProductImagePair from "./ProductImagePair";

export default function ProductCard({ product }) {
  const {
    id,
    title,
    origin,
    species,
    pearl_size,
    appearance,
    taste,
    texture,
    images = [],
    product_variants = [],
  } = product;

  const getStartingPrice = () => {
    if (!product_variants || product_variants.length === 0) return "€0,00+";
    const prices = product_variants.map((v) => v.price);
    const minPrice = Math.min(...prices);
    return `€${minPrice.toFixed(2).replace(".", ",")}+`;
  };

  return (
    <Link to={`/products/${id}`} className="group/product-card flex flex-col items-center select-none text-center w-full">
      <ProductImagePair images={images} title={title} className="mb-5 cursor-pointer bg-transparent" />

      <h3 className="font-assistant text-[15px] md:text-[14px] font-semibold uppercase tracking-[3px] text-[#121212] mb-3 leading-none md:transition-colors md:duration-300 md:group-hover/product-card:text-gh-gold">
        {title}
      </h3>

      <p className="font-assistant text-[14px] md:text-[12px] leading-relaxed text-[#121212]/60 font-light max-w-[95%] mx-auto">
        {origin} &middot; <span className="italic">{species}</span> Pearl size {pearl_size} {appearance} {taste} {texture}
      </p>

      <span className="font-sans text-[15px] md:text-[13px] font-bold tracking-wide text-[#121212] mt-4">
        {getStartingPrice()}
      </span>
    </Link>
  );
}
