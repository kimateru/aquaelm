import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800";

export default function BestSellersSlider({ products = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!swiperInstance || !prevRef.current || !nextRef.current) return;

    swiperInstance.params.navigation.prevEl = prevRef.current;
    swiperInstance.params.navigation.nextEl = nextRef.current;
    swiperInstance.navigation.destroy();
    swiperInstance.navigation.init();
    swiperInstance.navigation.update();
  }, [swiperInstance, products.length]);

  if (products.length === 0) return null;

  return (
    <div className="relative w-full group">
      <button
        ref={prevRef}
        type="button"
        className="best-sellers-nav best-sellers-nav-prev absolute left-3 md:left-5 top-[40%] -translate-y-1/2 bg-black/[0.02] hover:bg-black/[0.06] text-[#121212]/70 h-16 w-10 z-20 flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        ref={nextRef}
        type="button"
        className="best-sellers-nav best-sellers-nav-next absolute right-3 md:right-5 top-[40%] -translate-y-1/2 bg-black/[0.02] hover:bg-black/[0.06] text-[#121212]/70 h-16 w-10 z-20 flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <Swiper
        className="best-sellers-swiper pb-4 !px-3 md:!px-5"
        modules={[Navigation]}
        navigation
        slidesPerView="auto"
        spaceBetween={16}
        grabCursor
        watchOverflow
        speed={600}
        breakpoints={{
          768: { spaceBetween: 20 },
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={setSwiperInstance}
        onProgress={(swiper, progress) => setScrollProgress(progress)}
        onSlideChange={(swiper) => setScrollProgress(swiper.progress)}
      >
        {products.map((product) => {
          const primaryImage = product.images?.[0] || FALLBACK_IMAGE;
          return (
            <SwiperSlide
              key={product.id}
              className="!w-[calc(100vw-2.5rem)] sm:!w-[calc(50vw-1.75rem)] md:!w-[calc(34vw-1.25rem)] lg:!w-[calc(33.333vw-1rem)]"
            >
              <Link
                to={`/products/${product.id}`}
                className="flex flex-col items-center text-center group outline-none w-full"
              >
                <div className="aspect-square w-full overflow-hidden bg-transparent mb-5 relative">
                  <img
                    src={primaryImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-in-out group-hover:scale-105 pointer-events-none"
                  />
                </div>
                <h3 className="font-assistant text-[13px] font-semibold uppercase tracking-[3px] text-[#121212] leading-none mb-1">
                  {product.title}
                </h3>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="w-64 h-[2px] bg-black/10 relative mt-12 mx-auto overflow-hidden">
        <div
          className="absolute top-0 bottom-0 left-0 bg-gh-gold transition-transform duration-150"
          style={{
            width: "40%",
            transform: `translateX(${scrollProgress * 150}%)`,
          }}
        />
      </div>
    </div>
  );
}
