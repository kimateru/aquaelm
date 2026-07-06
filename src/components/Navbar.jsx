import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMagnifyingGlass, HiBars3, HiXMark } from "react-icons/hi2";
import { PiXBold } from "react-icons/pi";
import { IoChevronDown } from "react-icons/io5";
import fishGraphic from "../assets/Fish_Graphic.webp";
import { fetchProducts } from "../services/products";
import { useScrollLock } from "../context/LenisContext";

const LOGO_URL = "/logo_main.png";

const COUNTRIES = [
  { id: "uk", label: "United Kingdom", shortLabel: "UK" },
  { id: "md", label: "Moldova", shortLabel: "MD" },
];

const QUICK_SEARCHES = ["Beluga", "Osetra", "Sturgeon", "Foie Gras", "Truffles", "Gift Box"];

export default function Navbar() {
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const countryRef = useRef(null);

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
      setTimeout(() => searchInputRef.current?.focus(), 120);
    }
  }, [searchOpen]);

  useScrollLock(menuOpen || searchOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenSearch = () => {
    setSearchOpen(true);
    setMenuOpen(false);
    setCountryOpen(false);
  };

  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
    setSearchOpen(false);
    setCountryOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
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
      closeSearch();
    }
  };

  return (
    <div className="sticky top-0 z-50 select-none transition-all duration-300 brand-surface bg-aquaelm-blue border-b border-white/15">
      <header className="relative z-50 flex h-[7.75rem] w-full items-center justify-between bg-aquaelm-blue px-10 max-md:h-[4.75rem] max-md:px-4">
        <div className="relative z-30 flex min-w-0 flex-1 basis-0 items-center justify-start">
          <button
            type="button"
            onClick={handleOpenMenu}
            className="-ml-1 flex min-h-11 shrink-0 items-center gap-2.5 py-1 text-white outline-none transition-colors hover:text-aquaelm-accent max-md:gap-2"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <HiXMark className="h-6 w-6 shrink-0 max-md:h-[22px] max-md:w-[22px]" />
            ) : (
              <HiBars3 className="h-6 w-6 shrink-0 max-md:h-[22px] max-md:w-[22px]" />
            )}
            <span className="font-assistant text-sm font-semibold uppercase leading-none tracking-[0.2em] text-white max-md:text-[12px] max-md:tracking-[0.18em]">
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="absolute left-1/2 top-1/2 z-20 block -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:outline-none"
        >
          <img
            src={LOGO_URL}
            alt="Aquaelm"
            className="h-[7.5rem] w-[7.5rem] object-contain max-md:h-14 max-md:w-14"
          />
        </Link>

        <div className="relative z-30 flex min-w-0 flex-1 basis-0 items-center justify-end gap-1 text-white max-md:gap-0">
          <div className="relative flex shrink-0 items-center" ref={countryRef}>
            <button
              type="button"
              className="flex min-h-11 shrink-0 items-center gap-1.5 px-1 py-2 font-assistant text-[15px] font-medium leading-none text-white outline-none max-md:gap-1 max-md:px-0.5 max-md:py-0 max-md:text-[13px]"
              onClick={() => setCountryOpen(!countryOpen)}
              aria-expanded={countryOpen}
              aria-label={`Region: ${selectedCountry.label}`}
            >
              <span className="md:hidden">{selectedCountry.shortLabel}</span>
              <span className="hidden max-w-[140px] truncate md:inline md:max-w-none">
                {selectedCountry.label}
              </span>
              <IoChevronDown
                className={`h-4 w-4 shrink-0 text-aquaelm-accent transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] max-md:h-3.5 max-md:w-3.5 ${
                  countryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {countryOpen && (
              <ul
                className="absolute right-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden border border-aquaelm-accent/40 bg-aquaelm-blue py-1 shadow-xl"
                role="listbox"
              >
                {COUNTRIES.map((country) => (
                  <li key={country.id}>
                    <button
                      type="button"
                      className={`flex w-full items-center px-4 py-3 text-left font-assistant text-[15px] transition-colors md:py-2.5 md:text-[13px] ${
                        selectedCountry.id === country.id
                          ? "text-aquaelm-accent bg-white/10"
                          : "text-white/85 hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => {
                        setSelectedCountry(country);
                        setCountryOpen(false);
                      }}
                    >
                      {country.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={handleOpenSearch}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-white outline-none transition-all hover:bg-white/15 hover:text-aquaelm-accent md:h-auto md:w-auto md:px-2.5 md:py-1.5"
            aria-label="Search products"
          >
            <HiMagnifyingGlass className="h-6 w-6 max-md:h-[22px] max-md:w-[22px]" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#001a45]/70 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSearch}
      />

      <div
        className={`fixed inset-x-0 top-[7.75rem] z-50 px-8 transition-all duration-300 ease-out max-md:top-[4.75rem] max-md:px-4 ${
          searchOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div
          className="mx-auto max-w-2xl brand-surface bg-aquaelm-blue border border-aquaelm-accent/25 shadow-[0_24px_60px_rgba(0,0,0,0.35)] rounded-b-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 md:px-8 pt-7 pb-5 border-b border-white/10">
            <div className="flex items-end justify-between gap-4 mb-5">
              <p className="font-assistant text-[10px] uppercase tracking-[3px] text-white">
                Product Search
              </p>
              <button
                type="button"
                onClick={closeSearch}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Close search"
              >
                <PiXBold className="h-4 w-4" />
              </button>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full bg-transparent font-sans text-2xl md:text-3xl text-white placeholder-white/30 outline-none border-b border-white/20 focus:border-aquaelm-accent pb-3 transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit();
                if (e.key === "Escape") closeSearch();
              }}
            />
          </div>

          <div className="px-6 md:px-8 py-5 max-h-[50vh] overflow-y-auto" data-lenis-prevent>
            {searchQuery.trim().length > 0 ? (
              <>
                <p className="font-assistant text-[11px] uppercase tracking-[2px] text-white/45 mb-4">
                  {filteredSuggestions.length} match{filteredSuggestions.length !== 1 ? "es" : ""}
                </p>
                {filteredSuggestions.length > 0 ? (
                  <ul className="flex flex-col divide-y divide-white/10">
                    {filteredSuggestions.slice(0, 8).map((product) => {
                      const minPrice =
                        product.product_variants?.length > 0
                          ? Math.min(...product.product_variants.map((v) => v.price))
                          : 0;
                      return (
                        <li key={product.id}>
                          <Link
                            to={`/products/${product.id}`}
                            onClick={closeSearch}
                            className="flex items-center justify-between gap-4 py-3.5 group"
                          >
                            <div>
                              <span className="block font-assistant text-sm font-semibold uppercase tracking-[1.5px] text-white group-hover:text-aquaelm-accent transition-colors">
                                {product.title}
                              </span>
                              <span className="block font-assistant text-[11px] text-white/50 mt-0.5">
                                {product.category}
                              </span>
                            </div>
                            <span className="font-assistant text-xs text-aquaelm-accent-soft shrink-0">
                              from €{minPrice.toFixed(2).replace(".", ",")}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="font-assistant text-sm text-white/55 py-2">
                    Nothing matched &ldquo;{searchQuery}&rdquo;. Try another term.
                  </p>
                )}
                {filteredSuggestions.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="mt-5 w-full py-3 border border-aquaelm-accent/40 text-aquaelm-accent font-assistant text-[11px] font-semibold uppercase tracking-[2.5px] hover:bg-white/10 transition-colors"
                  >
                    Browse all results
                  </button>
                )}
              </>
            ) : (
              <>
                <p className="font-assistant text-[11px] uppercase tracking-[2px] text-white/45 mb-3">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(term)}
                      className="font-assistant text-[12px] text-white/80 border border-white/15 px-3 py-1.5 hover:border-aquaelm-accent hover:text-aquaelm-accent transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 brand-surface bg-aquaelm-blue transition-all duration-500 ease-in-out ${
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
            className="w-[140%] md:w-[110%] max-w-[850px] h-auto object-contain opacity-45 translate-x-[20%] translate-y-[15%] pointer-events-none select-none invert"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center pt-[7.75rem] max-md:pt-[4.75rem]">
          <nav className="flex flex-col items-center gap-8 md:gap-9">
            {[
              { to: "/", label: "Home", delay: "delay-100" },
              { to: "/pages/about-us", label: "Our Story", delay: "delay-150" },
              { to: "/collections/all", label: "Our Shop", delay: "delay-200" },
              { to: "/pages/contact-us", label: "Contact Us", delay: "delay-250" },
            ].map(({ to, label, delay }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`relative pb-1 font-ivy text-[44px] sm:text-[44px] md:text-[50px] font-light text-white transition-all duration-500 ease-out ${delay} ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {label}
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-aquaelm-accent" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
