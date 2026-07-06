export default function ProductImagePair({ images = [], title, className = "" }) {
  const primaryImage = images[0] || "/products/product1.png";
  const secondaryImage = images[1] || null;

  return (
    <div className={`relative aspect-square w-full overflow-hidden ${className}`.trim()}>
      <img
        src={primaryImage}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover md:transition-opacity md:duration-[800ms] md:ease-in-out md:group-hover/product-card:opacity-0"
      />
      {secondaryImage && (
        <img
          src={secondaryImage}
          alt={`${title} alternate view`}
          className="absolute inset-0 hidden h-full w-full object-cover md:block md:opacity-0 md:transition-opacity md:duration-[800ms] md:ease-in-out md:group-hover/product-card:opacity-100"
        />
      )}
    </div>
  );
}
