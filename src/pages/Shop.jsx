import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeroVideo from "../components/PageHeroVideo";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/products";
import { useScrollLock } from "../context/LenisContext";

const CAVIAR_FILTERS = ["Beluga", "Kaluga", "Sturgeon", "Sevruga", "Baerii", "Almas"];

const CATEGORY_DISPLAY_NAMES = {
  "From the sea": "Caviar",
  "From the land": "From the Land",
  "Gifts and Others": "Gifts & Others",
};

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sortRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  
  const [activeFilters, setActiveFilters] = useState([]);
  const [stagedFilters, setStagedFilters] = useState([]);

  useEffect(() => {
    if (location.state?.category === "From the sea") {
      setActiveFilters([...CAVIAR_FILTERS]);
      setStagedFilters([...CAVIAR_FILTERS]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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

  useScrollLock(isFilterOpen);

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
    return CATEGORY_DISPLAY_NAMES[catName] || catName;
  };

  const getCaviarFilterValue = (product) => {
    const cat = (product.category || "").toLowerCase();
    if (cat !== "from the sea") return null;

    const title = (product.title || "").toLowerCase();
    if (title.includes("beluga")) return "Beluga";
    if (title.includes("kaluga")) return "Kaluga";
    if (title.includes("sturgeon")) return "Sturgeon";
    if (title.includes("sevruga")) return "Sevruga";
    if (title.includes("baerii")) return "Baerii";
    if (title.includes("almas")) return "Almas";
    return null;
  };

  const filterCounts = products.reduce((acc, product) => {
    const value = getCaviarFilterValue(product);
    if (value) {
      acc[value] = (acc[value] || 0) + 1;
    }
    return acc;
  }, {});


  const getMinPrice = (product) => {
    if (!product.product_variants || product.product_variants.length === 0) return 0;
    const prices = product.product_variants.map(v => v.price);
    return Math.min(...prices);
  };


  const filteredProducts = products.filter(product => {

    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        (product.title || "").toLowerCase().includes(q) ||
        (product.category || "").toLowerCase().includes(q) ||
        (product.species || "").toLowerCase().includes(q) ||
        (product.origin || "").toLowerCase().includes(q) ||
        (product.taste || "").toLowerCase().includes(q) ||
        (product.appearance || "").toLowerCase().includes(q);
      
      if (!matchesSearch) return false;
    }


    if (activeFilters.length === 0) return true;

    const caviarType = getCaviarFilterValue(product);
    return caviarType && activeFilters.includes(caviarType);
  });


  const sortedProducts = [...filteredProducts];
  if (sortBy === "Price Ascending") {
    sortedProducts.sort((a, b) => getMinPrice(a) - getMinPrice(b));
  } else if (sortBy === "Price Descending") {
    sortedProducts.sort((a, b) => getMinPrice(b) - getMinPrice(a));
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
    <>
      <PageShell mainClassName="pb-24">
        <PageHeroVideo
          title="Our Shop"
          titleClassName="font-ivy text-[48px] sm:text-[68px] md:text-[84px] font-light text-white uppercase tracking-[4px] text-center"
        />

        <div className="border-y border-black/10 bg-white py-4 md:py-5 site-gutter-x md:px-12 flex items-center justify-between mb-8 md:mb-12 max-w-full z-10">
          <button
            type="button"
            onClick={() => {
              setStagedFilters([...activeFilters]);
              setIsFilterOpen(true);
            }}
            className="flex items-center gap-2.5 font-sans text-[13px] md:text-[11px] font-semibold uppercase tracking-[2px] text-[#121212] transition-opacity hover:opacity-80"
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
              className="flex items-center gap-2 font-sans text-[13px] md:text-[11px] font-semibold uppercase tracking-[2px] text-[#121212] transition-opacity hover:opacity-80"
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
                {["Featured", "Price Ascending", "Price Descending"].map((option) => (
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

        {searchQuery && (
          <div className="max-w-7xl mx-auto w-full px-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-black/5 animate-fade-in-down">
            <div className="flex items-center gap-2">
              <span className="font-assistant text-xs uppercase tracking-[2px] text-gh-dark/50">Search results for:</span>
              <span className="font-sans text-sm font-semibold text-gh-dark">"{searchQuery}"</span>
              <span className="font-assistant text-[11px] text-gh-dark/50 ml-1">({filteredProducts.length} items found)</span>
            </div>
            <button
              type="button"
              onClick={() => {
                navigate("/collections/all");
              }}
              className="self-start sm:self-auto font-sans text-xs text-gh-dark hover:text-gh-gold border border-black/15 hover:border-gh-gold/40 px-3.5 py-1.5 transition-colors duration-300 rounded-sm flex items-center gap-2"
            >
              <span>Clear Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 site-gutter-x text-center max-w-md mx-auto">
            <p className="text-red-500 font-semibold mb-2">Error Loading Products</p>
            <p className="text-xs text-gh-dark/60 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gh-gold text-white text-[11px] uppercase tracking-[2px] font-semibold px-6 py-2.5 hover:bg-aquaelm-blue-light transition-colors duration-300 rounded-sm"
            >
              Try Again
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 site-gutter-x text-center max-w-md mx-auto">
            <p className="font-ivy text-lg text-gh-dark mb-4">
              {searchQuery ? "No Results Found" : "No Caviar Available"}
            </p>
            <p className="text-xs text-gh-dark/60 mb-6">
              {searchQuery 
                ? `We couldn't find any products matching "${searchQuery}". Please try another search term.`
                : "We are currently selecting our next harvest. Please check back shortly."}
            </p>
            {searchQuery && (
              <button
                onClick={() => navigate("/collections/all")}
                className="bg-gh-gold text-white text-[11px] uppercase tracking-[2px] font-semibold px-6 py-2.5 hover:bg-aquaelm-blue-light transition-colors duration-300 rounded-sm"
              >
                Clear Search & Show All
              </button>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-10 md:gap-16">
            {categories.map((category) => (
              <div key={category} className="w-full section-content flex flex-col justify-center py-10 md:py-16">
                <h2 className="section-heading mb-8 md:mb-12 site-gutter-x">
                  {formatCategoryTitle(category)}
                </h2>

                <div className="max-w-7xl mx-auto w-full site-gutter-x">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16">
                    {groupedProducts[category].map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageShell>

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


        <div className="flex-grow overflow-y-auto px-10 py-6 space-y-4" data-lenis-prevent>
          {CAVIAR_FILTERS.map((filter) => {
            const isChecked = stagedFilters.includes(filter);
            const count = filterCounts[filter] || 0;

            return (
              <label
                key={filter}
                className="flex items-center gap-3.5 cursor-pointer group text-[#121212]/75 hover:text-black font-assistant text-[14px] select-none"
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => {
                    setStagedFilters((prev) =>
                      prev.includes(filter)
                        ? prev.filter((item) => item !== filter)
                        : [...prev, filter],
                    );
                  }}
                />
                <span
                  className={`w-[18px] h-[18px] border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-gh-gold border-gh-gold"
                      : "bg-white border-black/20 group-hover:border-black/50"
                  }`}
                >
                  {isChecked && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </span>
                <span className="tracking-[0.5px]">
                  {filter} ({count})
                </span>
              </label>
            );
          })}
        </div>


        <div className="p-10 border-t border-black/5 flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={() => setStagedFilters([])}
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
              setActiveFilters([...stagedFilters]);
              setIsFilterOpen(false);
            }}
            className="bg-gh-gold text-white text-[11px] font-semibold uppercase tracking-[2px] px-8 py-3.5 hover:bg-aquaelm-blue-light transition-colors duration-300 flex items-center gap-2"
          >
            Apply
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
