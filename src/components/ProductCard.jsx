import { useState } from "react";

export default function ProductCard({ product }) {
  const {
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

  const primaryImage = images[0] || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800";
  const secondaryImage = images[1] || null;

  const getStartingPrice = () => {
    if (!product_variants || product_variants.length === 0) return "€0,00+";
    const prices = product_variants.map((v) => v.price);
    const minPrice = Math.min(...prices);
    return `€${minPrice.toFixed(2).replace(".", ",")}+`;
  };

  return (
    <div className="group flex flex-col items-center select-none text-center">
      <div className="relative aspect-square w-full overflow-hidden bg-transparent mb-5 cursor-pointer">
        <img
          src={primaryImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[800ms] ease-in-out group-hover:opacity-0"
        />
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${title} alternative`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[800ms] ease-in-out group-hover:opacity-100"
          />
        )}
      </div>

      <h3 className="font-assistant text-[14px] font-semibold uppercase tracking-[3px] text-[#121212] mb-3 leading-none">
        {title}
      </h3>

      <p className="font-assistant text-[12px] leading-relaxed text-[#121212]/60 font-light max-w-[95%] mx-auto">
        {origin} &middot; <span className="italic">{species}</span> Pearl size {pearl_size}{appearance} {taste}{texture}
      </p>

      <span className="font-sans text-[13px] font-bold tracking-wide text-[#121212] mt-4">
        {getStartingPrice()}
      </span>
    </div>
  );
}
