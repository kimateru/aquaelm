import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { fetchProductById } from "../services/products";
import { DEFAULT_PRODUCT_IMAGES } from "../data/products";
import {
  ORDER_PHONE,
  ORDER_PHONE_DISPLAY,
  buildProductInquiryMailtoFromForm,
} from "../constants/contact";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const { data, error } = await fetchProductById(id);
        if (error || !data) {
          setError(error || "Product not found.");
        } else {
          setProduct(data);
          if (data.product_variants && data.product_variants.length > 0) {
            setSelectedVariant(data.product_variants[0]);
          }
          setCurrentImageIndex(0);
        }
      } catch (err) {
        setError(err.message || "An error occurred loading the product.");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handlePrevImage = () => {
    if (!product || !product.images || product.images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product || !product.images || product.images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <PageShell mainClassName="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gh-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="font-assistant text-xs uppercase tracking-[2px] text-[#121212]/60">Loading Details...</p>
        </div>
      </PageShell>
    );
  }

  if (error || !product) {
    return (
      <PageShell mainClassName="flex min-h-[50vh] flex-col items-center justify-center site-gutter-x text-center max-w-md mx-auto">
        <p className="text-red-500 font-semibold mb-2">Error Loading Product</p>
        <p className="text-xs text-gh-dark/60 mb-6">{error || "Product not found."}</p>
        <Link
          to="/collections/all"
          className="bg-gh-gold text-white text-[11px] uppercase tracking-[2px] font-semibold px-6 py-2.5 hover:bg-aquaelm-blue-light transition-colors duration-300 rounded-sm"
        >
          Back to Shop
        </Link>
      </PageShell>
    );
  }

  const {
    title,
    category,
    origin,
    species,
    pearl_size,
    appearance,
    taste,
    texture,
    images = [],
    product_variants = [],
  } = product;

  const currentImage = images[currentImageIndex] || DEFAULT_PRODUCT_IMAGES[0];
  const categoryLabel = category && category.toLowerCase().includes("sea") ? "CAVIAR" : (category ? category.toUpperCase() : "CAVIAR");
  const currentPrice = selectedVariant ? selectedVariant.price : 0;
  const priceFormatted = `€${currentPrice.toFixed(2).replace(".", ",")}`;
  const variantLabel = selectedVariant ? selectedVariant.weight : "";

  const handleInquiryChange = (field) => (e) => {
    setInquiryForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    window.location.href = buildProductInquiryMailtoFromForm({
      ...inquiryForm,
      productTitle: title,
      variantLabel,
    });
  };

  const inquiryInputClass =
    "w-full border-b border-black/10 bg-transparent py-2.5 font-assistant text-sm text-[#121212] outline-none focus:border-gh-gold transition-colors placeholder:text-[#121212]/40";

  return (
    <PageShell mainClassName="flex flex-col pb-20 md:pb-24">
        <div className="w-full mx-auto site-gutter-x md:px-8 lg:px-10 py-6 md:py-12 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-auto lg:min-h-[min(78vh,920px)] bg-[#f9f6f0] overflow-hidden group">
              <img
                src={currentImage}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-10 h-10 flex items-center justify-center cursor-pointer shadow-md transition-colors z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-300"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-10 h-10 flex items-center justify-center cursor-pointer shadow-md transition-colors z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-300"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col items-start lg:pt-4 lg:pr-2 xl:pr-6">
              <h6 className="font-assistant text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em] text-gh-gold mb-3 leading-none">
                {categoryLabel}
              </h6>

              <h1 className="font-ivy text-[42px] sm:text-[48px] lg:text-[54px] xl:text-[58px] text-[#121212] leading-[1.05] font-light mb-6 md:mb-8 uppercase tracking-wide">
                {title}
              </h1>

              <div className="space-y-4 text-[15px] md:text-[15px] lg:text-base leading-relaxed text-[#121212]/80 font-assistant font-light tracking-wide mb-8 md:mb-10 max-w-xl lg:max-w-none">
                <p className="text-black font-normal text-[16px] md:text-base">
                  {origin} &middot; <span className="italic">{species}</span>
                </p>
                {pearl_size && <p>Pearl size {pearl_size}</p>}
                {appearance && <p>{appearance}</p>}
                {taste && <p>{taste}</p>}
                {texture && <p>{texture}</p>}
              </div>

              {product_variants.length > 0 && (
                <div className="relative border-b border-black/10 pb-2.5 w-full max-w-xs mb-8">
                  <select
                    value={selectedVariant ? selectedVariant.id : ""}
                    onChange={(e) => {
                      const variant = product_variants.find(
                        (v) => v.id === e.target.value,
                      );
                      setSelectedVariant(variant);
                    }}
                    className="w-full bg-transparent font-assistant text-[15px] md:text-base font-light text-[#121212] pr-6 outline-none appearance-none cursor-pointer"
                  >
                    {product_variants.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.weight}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#121212]/60">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              )}

              <span className="font-sans text-xl md:text-2xl font-bold text-[#121212] mb-8">
                {priceFormatted}
              </span>

              <a
                href={`tel:${ORDER_PHONE}`}
                className="w-full max-w-lg bg-gh-gold text-white font-assistant text-[12px] md:text-[13px] font-semibold uppercase tracking-[3px] py-4 md:py-[1.125rem] text-center hover:bg-aquaelm-blue-light transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer mb-8"
              >
                CALL TO ORDER
              </a>

              <div className="w-full max-w-lg border-b border-black/10 pb-4">
                <button
                  type="button"
                  onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                  className="w-full flex items-center justify-between font-assistant text-[12px] md:text-[13px] font-semibold uppercase tracking-[1.5px] text-[#121212] py-2.5 hover:opacity-75 transition-opacity"
                >
                  <span>Delivery & Returns</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-3.5 h-3.5 transition-transform duration-200 ${isDeliveryOpen ? "rotate-180" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isDeliveryOpen && (
                  <div className="mt-3 font-assistant text-[13px] md:text-[14px] text-[#121212]/70 leading-relaxed font-light space-y-2">
                    <p>
                      We take great care in delivering our caviar at peak
                      freshness. All orders are shipped via overnight delivery
                      with temperature-controlled packaging. Once shipped, we
                      are unable to accept returns due to the perishable nature
                      of our products.
                    </p>
                    <p>
                      If your order arrives damaged or incorrect, please contact
                      us within 24 hours of delivery with photos, and we will
                      work to resolve the issue promptly. Your satisfaction is
                      our priority.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-14 md:mt-16 pt-10 md:pt-12 border-t border-black/10 w-full">
            <h2 className="font-assistant text-[12px] md:text-[13px] font-semibold uppercase tracking-[2px] text-gh-gold mb-2">
              Email Inquiry
            </h2>
            <p className="font-assistant text-[14px] md:text-[15px] text-[#121212]/70 font-light leading-relaxed mb-8 max-w-2xl">
              Send us a message about this product and our team will respond with availability and details.
            </p>

            <form onSubmit={handleInquirySubmit} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <label className="flex flex-col gap-1.5">
                  <span className="font-assistant text-[11px] font-semibold uppercase tracking-[1.5px] text-[#121212]/60">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={inquiryForm.name}
                    onChange={handleInquiryChange("name")}
                    required
                    autoComplete="name"
                    className={inquiryInputClass}
                    placeholder="Your name"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-assistant text-[11px] font-semibold uppercase tracking-[1.5px] text-[#121212]/60">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={inquiryForm.phone}
                    onChange={handleInquiryChange("phone")}
                    required
                    autoComplete="tel"
                    className={inquiryInputClass}
                    placeholder="Your phone number"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-assistant text-[11px] font-semibold uppercase tracking-[1.5px] text-[#121212]/60">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={inquiryForm.email}
                    onChange={handleInquiryChange("email")}
                    required
                    autoComplete="email"
                    className={inquiryInputClass}
                    placeholder="Your email"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-assistant text-[11px] font-semibold uppercase tracking-[1.5px] text-[#121212]/60">
                    Country
                  </span>
                  <input
                    type="text"
                    name="country"
                    value={inquiryForm.country}
                    onChange={handleInquiryChange("country")}
                    required
                    autoComplete="country-name"
                    className={inquiryInputClass}
                    placeholder="Your country"
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <button
                  type="submit"
                  className="bg-gh-gold text-white font-assistant text-[11px] font-semibold uppercase tracking-[3px] px-8 py-4 hover:bg-aquaelm-blue-light transition-colors duration-300"
                >
                  Send Inquiry &gt;
                </button>
                <p className="font-assistant text-[11px] text-[#121212]/50 font-light">
                  Or call {ORDER_PHONE_DISPLAY}
                </p>
              </div>
            </form>
          </div>
        </div>
    </PageShell>
  );
}
