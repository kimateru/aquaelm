import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import fishGraphic from "../assets/Fish_Graphic.webp";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../services/products";

const LOGO_URL =
  "https://gourmethouse.com/cdn/shop/files/ghc-logo-gold.png?v=1763673785&width=180";

const REGIONS = [{ label: "Europe", currency: "€" }];

export default function Navbar({ transparentOnTop = false }) {
  const [regionOpen, setRegionOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItemsCount } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    async function loadProductsForSearch() {
      try {
        const { data } = await fetchProducts();
        if (data) setAllProducts(data);
      } catch (err) {
        console.error("Failed to load products for search in Navbar:", err);
      }
    }
    loadProductsForSearch();
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!transparentOnTop) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentOnTop]);

  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen, searchOpen]);

  const handleOpenSearch = () => {
    setSearchOpen(true);
    setMenuOpen(false);
    setRegionOpen(false);
  };

  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
    setSearchOpen(false);
    setRegionOpen(false);
  };

  const filteredSuggestions = allProducts.filter((product) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return false;
    return (
      (product.title || "").toLowerCase().includes(query) ||
      (product.category || "").toLowerCase().includes(query) ||
      (product.species || "").toLowerCase().includes(query) ||
      (product.origin || "").toLowerCase().includes(query) ||
      (product.taste || "").toLowerCase().includes(query)
    );
  });

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/collections/all?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const showTransparent = transparentOnTop && !isScrolled && !menuOpen && !searchOpen;

  return (
    <div
      className={`sticky top-0 z-50 select-none transition-all duration-300 ${
        menuOpen
          ? "bg-transparent border-b border-transparent"
          : showTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white border-b border-black/5"
      }`}
    >

      <header className="mx-auto grid h-[75px] max-w-full grid-cols-[1fr_auto_1fr] items-center px-6 relative z-50">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleOpenMenu}
            className="group flex items-center gap-2.5 text-gh-brown transition-all hover:opacity-80 outline-none"
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#121212"
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6L6 18M6 6L18 18"
                />
              </svg>
            ) : (
              <span className="flex flex-col gap-[4px] w-5 justify-center items-start">
                <span className="w-full h-[1.5px] bg-[#121212]"></span>
                <span className="w-[12px] h-[1.5px] bg-[#121212] group-hover:w-full transition-all duration-300"></span>
              </span>
            )}


            <span className="font-sans text-[11px] font-semibold uppercase tracking-[3px] text-gh-dark">
              Menu
            </span>
          </button>
        </div>

        <div className="flex justify-center">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block outline-none focus-visible:outline-none"
          >
            <img
              src={LOGO_URL}
              alt="Gourmet House"
              width={65}
              height={65}
              className="h-[65px] w-[65px] object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end gap-5 text-gh-dark">
          <Link
            to="/cart"
            className="relative flex items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Cart"
          >
            <MdOutlineShoppingBag size={18} className="text-gh-dark" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] font-semibold w-3.5 h-3.5 flex items-center justify-center rounded-full leading-none">
                {totalItemsCount}
              </span>
            )}
          </Link>

          <div className="relative flex items-center">
            <button
              type="button"
              className="flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-[1.5px] text-gh-dark transition-all hover:opacity-80"
              onClick={() => setRegionOpen(!regionOpen)}
              aria-expanded={regionOpen}
            >
              <span>EUR</span>
              <span className="text-[7px] text-gh-dark/60">▼</span>
            </button>

            {regionOpen && (
              <ul
                className="absolute right-0 top-full z-50 mt-2 min-w-[120px] overflow-hidden border border-black/10 bg-white py-1.5 shadow-lg text-gh-dark"
                role="listbox"
              >
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-1.5 text-left font-sans text-xs hover:bg-black/5"
                    onClick={() => setRegionOpen(false)}
                  >
                    <span>Europe (EUR)</span>
                    <span className="text-black/50">€</span>
                  </button>
                </li>
              </ul>
            )}
          </div>

          <span className="font-sans text-[11px] font-semibold text-gh-dark select-none">
            €
          </span>

          <button
            type="button"
            onClick={handleOpenSearch}
            className="flex items-center justify-center transition-opacity hover:opacity-80 outline-none"
            aria-label="Search"
          >
            <CiSearch size={20} className="text-gh-dark" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ease-in-out ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setSearchOpen(false);
          setSearchQuery("");
        }}
      />

      <div
        className={`fixed inset-x-0 top-0 z-50 bg-white border-b border-black/10 transition-all duration-300 ease-in-out transform ${
          searchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-3">
              <CiSearch size={22} className="text-gh-dark" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search our collection..."
                className="w-full font-sans text-base md:text-lg text-gh-dark placeholder-gh-dark/40 outline-none border-none py-1 bg-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="text-[#121212] hover:opacity-60 transition-opacity p-2"
              aria-label="Close search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {searchQuery.trim().length > 0 && (
            <div className="mt-6 border-t border-black/5 pt-6 max-h-[60vh] overflow-y-auto">
              <h5 className="font-assistant text-[10px] md:text-[11px] font-semibold uppercase tracking-[2.5px] text-gh-dark/50 mb-4">
                Products found ({filteredSuggestions.length})
              </h5>
              {filteredSuggestions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredSuggestions.slice(0, 6).map((product) => {
                    const primaryImage = product.images?.[0] || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800";
                    const minPrice = product.product_variants && product.product_variants.length > 0
                      ? Math.min(...product.product_variants.map(v => v.price))
                      : 0;
                    return (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex gap-4 items-center p-2 hover:bg-black/[0.02] transition-colors rounded-sm group"
                      >
                        <div className="w-[60px] h-[60px] bg-[#f9f6f0] flex-shrink-0 overflow-hidden rounded-sm">
                          <img src={primaryImage} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-assistant text-xs font-semibold uppercase tracking-[1.5px] text-gh-dark group-hover:text-gh-gold transition-colors">
                            {product.title}
                          </span>
                          <span className="font-sans text-[12px] text-gh-dark/60 mt-0.5">
                            {product.category}
                          </span>
                          <span className="font-sans text-[13px] text-gh-dark font-medium mt-1">
                            from €{minPrice.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="font-assistant text-sm text-gh-dark/60 py-4">
                  No products found for "{searchQuery}"
                </p>
              )}

              {filteredSuggestions.length > 0 && (
                <div className="mt-6 border-t border-black/5 pt-4 text-center">
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="font-assistant text-[11px] font-semibold uppercase tracking-[2px] text-gh-dark underline underline-offset-[6px] decoration-[0.5px] hover:text-gh-gold transition-colors duration-300"
                  >
                    View all results &gt;
                  </button>
                </div>
              )}
            </div>
          )}

          {searchQuery.trim().length === 0 && (
            <div className="mt-6 border-t border-black/5 pt-6">
              <h5 className="font-assistant text-[10px] md:text-[11px] font-semibold uppercase tracking-[2px] text-gh-dark/50 mb-3">
                Suggested Searches
              </h5>
              <div className="flex flex-wrap gap-2.5">
                {["Beluga", "Sturgeon", "Imperial Osetra", "Foie Gras", "Truffles", "Gift Box"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                    }}
                    className="font-sans text-[13px] text-gh-dark hover:text-gh-gold border border-black/10 hover:border-gh-gold/40 px-3.5 py-1.5 transition-colors duration-300 rounded-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-gh-sand transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none translate-y-[-10px]"
        }`}
      >
        <div
          className={`absolute right-0 bottom-0 top-0 w-full md:w-[60%] pointer-events-none select-none overflow-hidden z-0 flex items-center justify-end transition-all duration-1000 ease-out ${
            menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <img
            src={fishGraphic}
            alt=""
            className="w-[140%] md:w-[110%] max-w-[850px] h-auto object-contain opacity-50 translate-x-[20%] translate-y-[15%] pointer-events-none select-none"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-[75px]">
          <nav className="flex flex-col items-center gap-7 md:gap-9">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`relative pb-1 font-ivy text-[38px] sm:text-[44px] md:text-[50px] font-light text-gh-dark/90 hover:text-gh-gold transition-all duration-500 ease-out delay-100 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Home
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gh-gold"></span>
            </Link>
            <Link
              to="/pages/about-us"
              onClick={() => setMenuOpen(false)}
              className={`relative pb-1 font-ivy text-[38px] sm:text-[44px] md:text-[50px] font-light text-gh-dark/90 hover:text-gh-gold transition-all duration-500 ease-out delay-150 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Our Story
            </Link>
            <Link
              to="/collections/all"
              onClick={() => setMenuOpen(false)}
              className={`relative pb-1 font-ivy text-[38px] sm:text-[44px] md:text-[50px] font-light text-gh-dark/90 hover:text-gh-gold transition-all duration-500 ease-out delay-200 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Our Shop
            </Link>
            <Link
              to="/pages/contact-us"
              onClick={() => setMenuOpen(false)}
              className={`relative pb-1 font-ivy text-[38px] sm:text-[44px] md:text-[50px] font-light text-gh-dark/90 hover:text-gh-gold transition-all duration-500 ease-out delay-250 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

