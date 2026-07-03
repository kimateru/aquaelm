import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroVideo from "../components/HeroVideo";
import Footer from "../components/Footer";
import BestSellersSlider from "../components/BestSellersSlider";
import fishGraphic from "../assets/Fish_Graphic.webp";
import { fetchProducts } from "../services/products";

const STATEMENT_TEXT = "The only guest allowed to be late to dinner. Heritage\nsourcing in the Persian tradition. This caviar is not for\neveryone—but then, neither are you.";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [bestSellers, setBestSellers] = useState([]);

  const LA_PERLE_TEXT = "Pearls before wine.";
  const [typedLaPerle, setTypedLaPerle] = useState("");
  const [startTypingLaPerle, setStartTypingLaPerle] = useState(false);


  const CAVIAR_X_TEXT = "Refined, daily.";
  const [typedCaviarX, setTypedCaviarX] = useState("");
  const [startTypingCaviarX, setStartTypingCaviarX] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTypingLaPerle(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const element = document.getElementById("la-perle-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTypingCaviarX(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const element = document.getElementById("caviar-x-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTypingLaPerle) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedLaPerle(LA_PERLE_TEXT.slice(0, index + 1));
      index++;
      if (index >= LA_PERLE_TEXT.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [startTypingLaPerle]);

  useEffect(() => {
    if (!startTypingCaviarX) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedCaviarX(CAVIAR_X_TEXT.slice(0, index + 1));
      index++;
      if (index >= CAVIAR_X_TEXT.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [startTypingCaviarX]);

  useEffect(() => {
    async function loadBestSellers() {
      try {
        const { data, error } = await fetchProducts();
        if (!error && data) {
          // Sort products by starting price descending and take top 6
          const sorted = [...data].sort((a, b) => {
            const getMinPrice = (p) => {
              if (!p.product_variants || p.product_variants.length === 0) return 0;
              return Math.min(...p.product_variants.map(v => v.price));
            };
            return getMinPrice(b) - getMinPrice(a);
          });
          setBestSellers(sorted.slice(0, 6));
        }
      } catch (err) {
        console.error("Error loading best sellers:", err);
      }
    }
    loadBestSellers();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("hero-statement-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedText(STATEMENT_TEXT.slice(0, index + 1));
      index++;
      if (index >= STATEMENT_TEXT.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [startTyping]);

  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const element = document.getElementById("HeroMediaBackground-template--24699078279507__hero_media_background_wLkGTa");
    if (element) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      setSectionTop(absoluteTop);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const relativeScroll = scrollY - (sectionTop - window.innerHeight);
  const bgTranslateY = relativeScroll > 0 ? relativeScroll * 0.12 : 0;
  const contentTranslateY = relativeScroll > 0 ? relativeScroll * -0.06 : 0;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      <Navbar />
      <main className="flex-grow flex flex-col">

        <HeroVideo />

        <div
          id="hero-statement-section"
          className="relative section-viewport py-28 px-6 md:px-12 flex flex-col items-center text-center bg-white overflow-hidden justify-center"
        >

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <img
              src={fishGraphic}
              alt=""
              className="w-[95%] md:w-[85%] max-w-[650px] aspect-square object-contain opacity-80"
            />
          </div>

          <div className="relative z-10 max-w-6xl w-full flex flex-col items-center gap-7">
            <h6 className="font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-gh-gold">
              ALWAYS TASTEFUL. NEVER MODEST.
            </h6>

            <h4
              className="font-ivy text-[24px] md:text-[38px] lg:text-[46px] text-[#121212] leading-[1.35] font-light max-w-[1100px] mx-auto min-h-[110px] md:min-h-[170px] lg:min-h-[200px] gsap-hero-title-split _gsap-ready whitespace-pre-line"
              aria-label={STATEMENT_TEXT.replace(/\n/g, " ")}
            >
              {typedText}
              {typedText.length < STATEMENT_TEXT.length && (
                <span className="inline-block w-[1.5px] h-8 bg-gh-gold ml-1 align-middle animate-pulse">
                  |
                </span>
              )}
            </h4>

            <div className="mt-4">
              <Link
                to="/pages/about-us"
                className="font-assistant text-xs md:text-[13px] font-semibold uppercase tracking-[0.2em] text-gh-gold transition-all duration-300 hover:text-opacity-80 relative"
              >
                <span className="inline-flex items-center gap-1.5 pb-1.5 border-b border-gh-gold">
                  SINCE 1965
                  <span className="text-[10px]">&gt;</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div
          id="HeroMediaBackground-template--24699078279507__hero_media_background_wLkGTa"
          className="hero-media-background relative w-full section-viewport flex items-center justify-center overflow-hidden"
        >

          <div className="hero-media-background__media hero-media-background__image absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://gourmethouse.com/cdn/shop/files/home_shop_hero.png?v=1764017510&width=1500"
              alt="Caviar Shop"
              className="w-full h-full object-cover will-change-transform"
              style={{ transform: `translateY(${bgTranslateY}px) scale(1.15)`, transition: 'transform 100ms ease-out' }}
            />
          </div>

          <div className="hero-media-background__overlay absolute inset-0 bg-black/5 z-10"></div>

          <div 
            className="hero-media-background__container relative z-20 max-w-4xl px-6 flex flex-col items-center text-center gap-6 will-change-transform"
            style={{ transform: `translateY(${contentTranslateY}px)`, transition: 'transform 100ms ease-out' }}
          >
            <div className="hero-media-background__content flex flex-col items-center gap-6">
              <h6 className="hero-media-background__eyebrow font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-white">
                Caviar
              </h6>

              <h2
                className="hero-media-background__title font-ivy text-[36px] md:text-[54px] lg:text-[60px] text-white leading-[1.25] font-light max-w-3xl mx-auto gsap-hero-title-split _gsap-ready"
                aria-label="Never apologize for wanting more."
              >
                Never apologize for <br /> wanting more.
              </h2>

              <div className="hero-media-background__link mt-4">
                <Link
                  to="/collections/all"
                  className="font-assistant text-xs md:text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:text-opacity-80 relative"
                >
                  <span className="inline-flex items-center gap-1.5 pb-1.5 border-b border-white">
                    INDULGE A LITTLE
                    <span className="text-[10px]">&gt;</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full section-viewport py-20 bg-white relative border-t border-black/5 overflow-hidden flex flex-col justify-center">
          <h2 className="font-ivy text-[34px] md:text-[44px] text-gh-dark text-center font-light mb-12 tracking-wide uppercase px-6">
            Best Sellers
          </h2>

          <BestSellersSlider products={bestSellers} />
        </div>


        <div
          id="la-perle-section"
          className="relative w-full section-viewport flex items-center overflow-hidden bg-[#f4f4f4] border-t border-black/5"
        >

          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src="https://gourmethouse.com/cdn/shop/files/la-perle-full-width.jpg?v=1767984077&width=1500"
              alt="La Perle"
              className="w-full h-full object-cover object-right md:object-center select-none"
            />
          </div>


          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex items-center justify-start">
            <div className="max-w-[85%] sm:max-w-[60%] md:max-w-xl flex flex-col items-start text-left gap-4 md:gap-5">
              <h6 className="font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-gh-gold">
                LA PERLE
              </h6>
              
              <h2 className="font-ivy text-[34px] sm:text-[44px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.2] font-light min-h-[50px] md:min-h-[75px] lg:min-h-[90px]">
                {typedLaPerle}
                {typedLaPerle.length < LA_PERLE_TEXT.length && (
                  <span className="inline-block w-[1.5px] h-8 bg-gh-gold ml-1 align-middle animate-pulse">
                    |
                  </span>
                )}
              </h2>
              
              <p className="font-assistant text-[12px] md:text-[14px] leading-relaxed text-[#121212]/75 font-light">
                La Perle, served in a pearl. Excessive? Of course not, it fits in a spoon. <br className="hidden sm:inline" />
                A mother-of-pearl spoon—you're not an animal.
              </p>
              
              <div className="mt-4 md:mt-5">
                <Link
                  to="/collections/all"
                  className="font-assistant text-xs md:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#121212] transition-all duration-300 hover:text-opacity-80 relative"
                >
                  <span className="inline-flex items-center gap-1.5 pb-1.5 border-b border-[#121212]">
                    ENJOY APRÈS-ANYTHING
                    <span className="text-[10px]">&gt;</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          id="caviar-x-section"
          className="relative w-full section-viewport flex items-center overflow-hidden bg-[#f4f4f4] border-t border-black/5"
        >

          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src="https://gourmethouse.com/cdn/shop/files/pills-full-width.jpg?v=1767976589&width=1500"
              alt="Caviar X"
              className="w-full h-full object-cover object-left md:object-center select-none"
            />
          </div>


          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex items-center justify-end">
            <div className="max-w-[85%] sm:max-w-[60%] md:max-w-xl flex flex-col items-start text-left gap-4 md:gap-5">
              <h6 className="font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-gh-gold">
                CAVIAR X
              </h6>
              
              <h2 className="font-ivy text-[34px] sm:text-[44px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.2] font-light min-h-[50px] md:min-h-[75px] lg:min-h-[90px]">
                {typedCaviarX}
                {typedCaviarX.length < CAVIAR_X_TEXT.length && (
                  <span className="inline-block w-[1.5px] h-8 bg-gh-gold ml-1 align-middle animate-pulse">
                    |
                  </span>
                )}
              </h2>
              
              <p className="font-assistant text-[12px] md:text-[14px] leading-relaxed text-[#121212]/75 font-light">
                100% pure caviar oil from sustainably sourced Polish Acipenser baerii. Omega-3, 6, and 9—supporting hydration, elasticity, and a youthful appearance.
              </p>
              
              <p className="font-assistant text-[12px] md:text-[14px] leading-relaxed text-[#121212]/75 font-light">
                Purified to the highest standard under strictly controlled aquaculture conditions. Free from heavy metals, PCBs, and microplastics. Odorless. Highly concentrated.
              </p>
              
              <div className="mt-4 md:mt-5">
                <Link
                  to="/collections/all"
                  className="font-assistant text-xs md:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#121212] transition-all duration-300 hover:text-opacity-80 relative"
                >
                  <span className="inline-flex items-center gap-1.5 pb-1.5 border-b border-[#121212]">
                    SHOP NOW
                    <span className="text-[10px]">&gt;</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



