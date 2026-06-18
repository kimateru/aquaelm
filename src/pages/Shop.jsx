import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/products";

const HLS_VIDEO_URL =
  "https://gourmethouse.com/cdn/shop/videos/c/vp/f4c32831fcc545069ff7bcaa44e2b2b4/f4c32831fcc545069ff7bcaa44e2b2b4.m3u8?v=0";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const { data, error } = await fetchProducts();
        if (error) {
          setError(error);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_VIDEO_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Autoplay blocked:", e));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_VIDEO_URL;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Autoplay blocked:", e));
      });
    }
  }, []);

  const formatCategoryTitle = (catName) => {
    if (!catName) return "Caviar";
    const lowerWords = ["the", "from", "of", "in", "a", "to", "by"];
    return catName
      .split(" ")
      .map((word, index) => {
        const wordLower = word.toLowerCase();
        if (index > 0 && lowerWords.includes(wordLower)) {
          return wordLower;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.category || "From the sea";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(product);
    return acc;
  }, {});

  const categories = Object.keys(groupedProducts);

  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto px-6 py-8">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="flex flex-col bg-white p-4 border border-black/5 animate-pulse rounded-sm"
        >
          <div className="aspect-square bg-black/[0.04] w-full rounded-sm mb-5"></div>
          <div className="flex justify-between items-start gap-4 mb-2">
            <div className="h-6 bg-black/[0.04] w-3/4 rounded-sm"></div>
            <div className="h-6 bg-black/[0.04] w-1/5 rounded-sm"></div>
          </div>
          <div className="h-4 bg-black/[0.04] w-1/2 rounded-sm mb-5"></div>
          <div className="h-8 bg-black/[0.04] w-2/3 rounded-sm mb-5"></div>
          <div className="h-6 bg-black/[0.04] w-1/3 rounded-sm mb-4 mt-auto"></div>
          <div className="h-11 bg-black/[0.04] w-full rounded-sm mt-3"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      <Navbar transparentOnTop={true} />

      <main className="flex-grow flex flex-col pb-24">
        <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden -mt-[75px] bg-[#121212]">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-black/10 z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20 select-none pointer-events-none">
            <h1 className="font-ivy text-[48px] sm:text-[68px] md:text-[84px] font-light text-white uppercase tracking-[4px] text-center mt-[75px]">
              Our Shop
            </h1>
          </div>
        </div>

        <div className="border-y border-black/10 bg-white py-5 px-6 md:px-12 flex items-center justify-between mb-12 max-w-full z-10">
          <button
            type="button"
            className="flex items-center gap-2.5 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-[#121212] transition-opacity hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 0V21m6-6.75V3.75m0 10.5a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 0V21m6-12V3.75m0 5.25a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 0V21"
              />
            </svg>
            Filter
          </button>
          <button
            type="button"
            className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-[#121212] transition-opacity hover:opacity-80"
          >
            Sort By
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center max-w-md mx-auto">
            <p className="text-red-500 font-semibold mb-2">Error Loading Products</p>
            <p className="text-xs text-gh-dark/60 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gh-dark text-white text-[11px] uppercase tracking-[2px] font-semibold px-6 py-2.5 hover:bg-gh-gold transition-colors duration-300 rounded-sm"
            >
              Try Again
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center max-w-md mx-auto">
            <p className="font-ivy text-lg text-gh-dark mb-4">No Caviar Available</p>
            <p className="text-xs text-gh-dark/60">
              We are currently selecting our next harvest. Please check back shortly.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-16">
            {categories.map((category) => (
              <div key={category} className="w-full">
                <h2 className="font-ivy text-[34px] sm:text-[44px] md:text-[50px] text-gh-dark text-center font-light mb-10 md:mb-12 tracking-wide uppercase">
                  {formatCategoryTitle(category)}
                </h2>

                <div className="max-w-7xl mx-auto w-full px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                    {groupedProducts[category].map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
