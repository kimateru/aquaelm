import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import fishGraphic from "../assets/Fish_Graphic.webp";

const LOGO_URL =
  "https://gourmethouse.com/cdn/shop/files/ghc-logo-gold.png?v=1763673785&width=180";

const REGIONS = [{ label: "Europe", currency: "€" }];

export default function Navbar({ transparentOnTop = false }) {
  const [regionOpen, setRegionOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  const showTransparent = transparentOnTop && !isScrolled && !menuOpen;

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
            onClick={() => setMenuOpen(!menuOpen)}
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
          <a
            href="/cart"
            className="flex items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Cart"
          >
            <MdOutlineShoppingBag size={18} className="text-gh-dark" />
          </a>

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
            className="flex items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Search"
          >
            <CiSearch size={20} className="text-gh-dark" />
          </button>
        </div>
      </header>

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
            className="w-[140%] md:w-[110%] max-w-[850px] h-auto object-contain opacity-[0.08] translate-x-[20%] translate-y-[15%] pointer-events-none select-none"
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

