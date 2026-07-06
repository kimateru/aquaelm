import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import HeroVideo from "../components/HeroVideo";
import BestSellersSlider from "../components/BestSellersSlider";
import FogRevealText, { FogRevealBlock } from "../components/FogRevealText";
import fishGraphic from "../assets/Fish_Graphic.webp";
import { fetchProducts } from "../services/products";

const STATEMENT_TEXT =
  "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Sed do eiusmod tempor\nincididunt ut labore—et dolore magna aliqua.";

const LA_PERLE_TEXT = "Lorem ipsum dolor.";

const LA_PERLE_BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const CAVIAR_X_TEXT = "Consectetur adipiscing.";

const CAVIAR_X_BODY =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.";

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    async function loadBestSellers() {
      try {
        const { data, error } = await fetchProducts();
        if (!error && data) {
          const sorted = [...data].sort((a, b) => {
            const getMinPrice = (p) => {
              if (!p.product_variants || p.product_variants.length === 0) return 0;
              return Math.min(...p.product_variants.map((v) => v.price));
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

  return (
    <PageShell>
        <HeroVideo />

        <div
          id="hero-statement-section"
          className="relative section-viewport-hero site-gutter-x md:px-12 flex flex-col items-center text-center bg-white overflow-hidden justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <img
              src={fishGraphic}
              alt=""
              className="w-[118%] max-w-[820px] md:w-[85%] md:max-w-[650px] aspect-square object-contain opacity-80 scale-105 md:scale-100"
            />
          </div>

          <div className="relative z-10 max-w-6xl w-full flex flex-col items-center gap-8 md:gap-7 px-1">
            <h6 className="font-assistant text-[13px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-gh-gold">
              ALWAYS TASTEFUL. NEVER MODEST.
            </h6>

            <FogRevealText
              as="h4"
              text={STATEMENT_TEXT}
              className="font-ivy text-[36px] sm:text-[40px] md:text-[38px] lg:text-[46px] text-[#121212] leading-[1.28] font-light max-w-[1100px] mx-auto whitespace-pre-line"
            />

            <div className="mt-2 md:mt-4">
              <Link
                to="/pages/about-us"
                className="font-assistant text-[14px] md:text-[13px] font-semibold uppercase tracking-[0.2em] text-gh-gold transition-all duration-300 hover:text-opacity-80 relative"
              >
                <span className="inline-flex items-center gap-1.5 pb-1.5 border-b border-gh-gold">
                  SINCE 1965
                  <span className="text-[12px] md:text-[10px]">&gt;</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div
          id="HeroMediaBackground-template--24699078279507__hero_media_background_wLkGTa"
          className="hero-media-background relative w-full section-viewport-hero flex items-center justify-center overflow-hidden"
        >
          <div className="hero-media-background__media hero-media-background__image absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://gourmethouse.com/cdn/shop/files/home_shop_hero.png?v=1764017510&width=1500"
              alt="Caviar Shop"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="hero-media-background__overlay absolute inset-0 bg-black/5 z-10"></div>

          <div className="hero-media-background__container relative z-20 max-w-4xl site-gutter-x flex flex-col items-center text-center gap-6">
            <div className="hero-media-background__content flex flex-col items-center gap-6">
              <h6 className="hero-media-background__eyebrow eyebrow-label text-white">
                Caviar
              </h6>

              <FogRevealText
                as="h2"
                text={"Consectetur adipiscing elit,\nsed do eiusmod tempor."}
                className="hero-media-background__title font-ivy text-[42px] sm:text-[48px] md:text-[54px] lg:text-[60px] text-white leading-[1.2] font-light max-w-3xl mx-auto"
              />

              <div className="hero-media-background__link mt-4">
                <Link
                  to="/collections/all"
                  className="cta-link text-white"
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

        <div className="w-full section-content py-12 md:py-20 bg-white relative border-t border-black/5 overflow-hidden flex flex-col justify-center">
          <h2 className="section-heading mb-8 md:mb-12 site-gutter-x">
            Best Sellers
          </h2>

          <BestSellersSlider products={bestSellers} />
        </div>

        <div
          id="la-perle-section"
          className="flex flex-col border-t border-black/5 bg-white md:relative md:min-h-screen md:overflow-hidden md:bg-gh-gray"
        >
          <div className="relative h-[50vh] w-full shrink-0 overflow-hidden md:pointer-events-none md:absolute md:inset-0 md:h-full md:z-0">
            <img
              src="/images/section1.jpg"
              alt="La Perle"
              className="h-full w-full object-cover object-center select-none md:absolute md:inset-0"
            />
          </div>

          <div className="relative z-10 w-full site-gutter-x py-10 md:absolute md:inset-0 md:mx-auto md:flex md:max-w-7xl md:items-center md:px-12 md:py-0 lg:px-20">
            <div className="flex w-full flex-col items-start gap-4 text-left md:max-w-xl md:gap-5">
              <h6 className="eyebrow-label">
                LA PERLE
              </h6>

              <FogRevealText
                as="h2"
                text={LA_PERLE_TEXT}
                splitLines={false}
                className="font-ivy text-[34px] sm:text-[38px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.15] font-light"
              />

              <FogRevealBlock
                as="p"
                delay={0.2}
                className="font-assistant text-[14px] leading-relaxed text-[#121212]/75 font-light"
                text={LA_PERLE_BODY}
              />

              <div className="mt-2 md:mt-5">
                <Link
                  to="/collections/all"
                  className="cta-link text-[#121212]"
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
          className="flex flex-col border-t border-black/5 bg-white md:relative md:min-h-screen md:overflow-hidden md:bg-gh-gray"
        >
          <div className="relative h-[50vh] w-full shrink-0 overflow-hidden md:pointer-events-none md:absolute md:inset-0 md:h-full md:z-0">
            <img
              src="/images/section2.jpg"
              alt="Caviar X"
              className="h-full w-full object-cover object-center select-none md:absolute md:inset-0"
            />
          </div>

          <div className="relative z-10 w-full site-gutter-x py-10 md:absolute md:inset-0 md:mx-auto md:flex md:max-w-7xl md:items-center md:justify-end md:px-12 md:py-0 lg:px-20">
            <div className="flex w-full flex-col items-start gap-4 text-left md:max-w-xl md:gap-5">
              <h6 className="eyebrow-label">
                CAVIAR X
              </h6>

              <FogRevealText
                as="h2"
                text={CAVIAR_X_TEXT}
                splitLines={false}
                className="font-ivy text-[34px] sm:text-[38px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.15] font-light"
              />

              <FogRevealBlock
                as="p"
                delay={0.2}
                className="font-assistant text-[14px] leading-relaxed text-[#121212]/75 font-light"
                text={CAVIAR_X_BODY}
              />

              <div className="mt-2 md:mt-5">
                <Link
                  to="/collections/all"
                  className="cta-link text-[#121212]"
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
    </PageShell>
  );
}
