import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/products";

const HLS_VIDEO_URL =
  "https://gourmethouse.com/cdn/shop/videos/c/vp/f4c32831fcc545069ff7bcaa44e2b2b4/f4c32831fcc545069ff7bcaa44e2b2b4.m3u8?v=0";

const FILTER_STRUCTURE = {
  "From the sea": ["Beluga", "Kaluga", "Sturgeon", "Sevruga", "Baerii", "Almas"],
  "From the land": ["Foie Gras", "Saffron", "Truffles"],
  "Gifts and Others": ["Mother of Pearl", "Gift Boxes", "Accompaniments", "Skincare"]
};

const CATEGORY_DISPLAY_NAMES = {
  "From the sea": "From The Sea",
  "From the land": "From The Land",
  "Gifts and Others": "Gifts and Accessories"
};

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const sortRef = useRef(null);


  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  
  const [activeFilters, setActiveFilters] = useState({
    "From the sea": [],
    "From the land": [],
    "Gifts and Others": []
  });
  
  const [stagedFilters, setStagedFilters] = useState({
    "From the sea": [],
    "From the land": [],
    "Gifts and Others": []
  });

  const [expandedAccordions, setExpandedAccordions] = useState({
    "From the sea": false,
    "From the land": false,
    "Gifts and Others": false
  });

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


  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatCategoryTitle = (catName) => {
    if (!catName) return "Caviar";
    if (catName.toLowerCase() === "gifts and others") return "Gifts and Accessories";
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

  const getProductSubcategory = (product) => {
    const title = (product.title || "").toLowerCase();
    const cat = (product.category || "").toLowerCase();
    
    if (cat === "from the sea") {
      if (title.includes("beluga")) return "Beluga";
      if (title.includes("kaluga")) return "Kaluga";
      if (title.includes("sturgeon")) return "Sturgeon";
      if (title.includes("sevruga")) return "Sevruga";
      if (title.includes("baerii")) return "Baerii";
      if (title.includes("almas")) return "Almas";
    }
    if (cat === "from the land") {
      if (title.includes("foie gras")) return "Foie Gras";
      if (title.includes("saffron")) return "Saffron";
      if (title.includes("truffle")) return "Truffles";
    }
    if (cat === "gifts and others" || cat === "gifts and accessories") {
      if (title.includes("mother of pearl")) return "Mother of Pearl";
      if (title.includes("gift") || title.includes("box")) return "Gift Boxes";
      if (title.includes("blini") || title.includes("fraiche")) return "Accompaniments";
      if (title.includes("caviar x") || title.includes("skincare")) return "Skincare";
    }
    return null;
  };


  const subcatCounts = products.reduce((acc, product) => {
    const subcat = getProductSubcategory(product);
    if (subcat) {
      acc[subcat] = (acc[subcat] || 0) + 1;
    }
    return acc;
  }, {});


  const getMinPrice = (product) => {
    if (!product.product_variants || product.product_variants.length === 0) return 0;
    const prices = product.product_variants.map(v => v.price);
    return Math.min(...prices);
  };


  const getRarityScore = (product) => {
    const title = (product.title || "").toLowerCase();
    
    if (title.includes("almas")) return 10;
    if (title.includes("beluga xx")) return 9.5;
    if (title.includes("beluga")) return 9;
    if (title.includes("sevruga")) return 8.5;
    if (title.includes("kaluga hybrid a")) return 7.5;
    if (title.includes("kaluga hybrid")) return 7;
    if (title.includes("kaluga")) return 6.5;
    if (title.includes("white sturgeon")) return 6;
    if (title.includes("baerii")) return 5;
    
    if (title.includes("3% truffle")) return 9;
    if (title.includes("goose foie gras")) return 8;
    if (title.includes("duck foie gras")) return 7;
    if (title.includes("black truffles")) return 8.5;
    if (title.includes("saffron")) return 8;
    
    if (title.includes("gift box")) return 9;
    if (title.includes("mother of pearl")) return 8;
    if (title.includes("blinis")) return 7;
    if (title.includes("fraiche")) return 7;
    if (title.includes("caviar x")) return 7;
    
    return 1;
  };


  const filteredProducts = products.filter(product => {
    const hasActiveFilters = 
      activeFilters["From the sea"].length > 0 ||
      activeFilters["From the land"].length > 0 ||
      activeFilters["Gifts and Others"].length > 0;
      
    if (!hasActiveFilters) return true;
    
    const productCat = product.category || "From the sea";
    const selectedSubcatsForCategory = activeFilters[productCat] || [];
    
    const subcat = getProductSubcategory(product);
    return selectedSubcatsForCategory.includes(subcat);
  });


  const sortedProducts = [...filteredProducts];
  if (sortBy === "Price Ascending") {
    sortedProducts.sort((a, b) => getMinPrice(a) - getMinPrice(b));
  } else if (sortBy === "Price Descending") {
    sortedProducts.sort((a, b) => getMinPrice(b) - getMinPrice(a));
  } else if (sortBy === "Rarest First") {
    sortedProducts.sort((a, b) => {
      const rarityDiff = getRarityScore(b) - getRarityScore(a);
      if (rarityDiff !== 0) return rarityDiff;
      return getMinPrice(b) - getMinPrice(a);
    });
  } 


  const groupedProducts = sortedProducts.reduce((acc, product) => {
    const cat = product.category || "From the sea";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(product);
    return acc;
  }, {});

  const CATEGORY_ORDER = ["From the sea", "From the land", "Gifts and Others"];
  const categories = CATEGORY_ORDER.filter(cat => groupedProducts[cat] && groupedProducts[cat].length > 0);

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
            onClick={() => {
              setStagedFilters({ ...activeFilters });
              setIsFilterOpen(true);
            }}
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
          
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-[#121212] transition-opacity hover:opacity-80"
            >
              Sort By {sortBy !== "Featured" && `(${sortBy})`}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-3 h-3 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            
            {isSortOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-black/15 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-30 py-5 px-6 flex flex-col gap-3.5">
                {["Featured", "Rarest First", "Price Ascending", "Price Descending"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSortBy(option);
                      setIsSortOpen(false);
                    }}
                    className={`font-assistant text-[15px] text-left transition-colors ${
                      sortBy === option ? "text-black font-semibold" : "text-[#121212]/70 hover:text-black"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
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


      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setIsFilterOpen(false)}
        />
      )}


      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-[420px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="flex justify-end p-6 border-b border-black/5">
          <button 
            type="button" 
            onClick={() => setIsFilterOpen(false)}
            className="text-[#121212] hover:opacity-60 transition-opacity p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        <div className="flex-grow overflow-y-auto px-10 py-6 space-y-6">
          {Object.entries(FILTER_STRUCTURE).map(([categoryKey, subcategories]) => {
            const isExpanded = expandedAccordions[categoryKey];
            const displayName = CATEGORY_DISPLAY_NAMES[categoryKey];
            

            const toggleAccordion = (key) => {
              setExpandedAccordions(prev => ({
                ...prev,
                [key]: !prev[key]
              }));
            };


            const toggleFilterCheckbox = (cat, sub) => {
              setStagedFilters(prev => {
                const currentList = prev[cat] || [];
                const newList = currentList.includes(sub)
                  ? currentList.filter(item => item !== sub)
                  : [...currentList, sub];
                return {
                  ...prev,
                  [cat]: newList
                };
              });
            };

            return (
              <div key={categoryKey} className="border-b border-black/5 pb-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion(categoryKey)}
                  className="w-full flex justify-between items-center text-left py-2 font-assistant text-[15px] font-medium tracking-[1.5px] uppercase text-[#121212]/85 hover:text-black transition-colors"
                >
                  <span>{displayName}</span>
                  <span className="text-[20px] font-light leading-none select-none">
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>
                
                {isExpanded && (
                  <div className="mt-4 pl-1 space-y-4">
                    {subcategories.map((subcat) => {
                      const isChecked = stagedFilters[categoryKey]?.includes(subcat);
                      const count = subcatCounts[subcat] || 0;
                      
                      return (
                        <label 
                          key={subcat} 
                          className="flex items-center gap-3.5 cursor-pointer group text-[#121212]/75 hover:text-black font-assistant text-[14px] select-none"
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={() => toggleFilterCheckbox(categoryKey, subcat)}
                          />
                          <span className={`w-[18px] h-[18px] border flex items-center justify-center transition-all ${
                            isChecked 
                              ? 'bg-gh-dark border-gh-dark' 
                              : 'bg-white border-black/20 group-hover:border-black/50'
                          }`}>
                            {isChecked && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </span>
                          <span className="tracking-[0.5px]">
                            {subcat} ({count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>


        <div className="p-10 border-t border-black/5 flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={() => {
              setStagedFilters({
                "From the sea": [],
                "From the land": [],
                "Gifts and Others": []
              });
            }}
            className="font-sans text-[11px] font-semibold uppercase tracking-[2px] border-b border-[#121212] text-[#121212] pb-0.5 hover:opacity-75 transition-opacity flex items-center gap-1.5"
          >
            Clear All
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setActiveFilters({ ...stagedFilters });
              setIsFilterOpen(false);
            }}
            className="bg-[#121212] text-white text-[11px] font-semibold uppercase tracking-[2px] px-8 py-3.5 hover:bg-gh-gold transition-colors duration-300 flex items-center gap-2"
          >
            Apply
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
