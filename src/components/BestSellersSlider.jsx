import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductImagePair from "./ProductImagePair";

export default function BestSellersSlider({ products = [] }) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateSliderState = (swiper) => {
    setScrollProgress(swiper.progress);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (products.length === 0) return null;

  const navBtnClass =
    "best-sellers-nav absolute top-[38%] z-20 flex h-14 w-9 -translate-y-1/2 cursor-pointer items-center justify-center bg-black/[0.03] text-[#121212]/70 transition-colors hover:bg-black/[0.06] disabled:cursor-default disabled:opacity-35 md:h-16 md:w-10";

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => swiperInstance?.slidePrev()}
        disabled={isBeginning}
        className={`${navBtnClass} best-sellers-nav-prev left-2 sm:left-3 md:left-5`}
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => swiperInstance?.slideNext()}
        disabled={isEnd}
        className={`${navBtnClass} best-sellers-nav-next right-2 sm:right-3 md:right-5`}
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <Swiper
        className="best-sellers-swiper pb-4 !px-4 md:!px-5"
        slidesPerView="auto"
        spaceBetween={16}
        grabCursor
        watchOverflow
        speed={600}
        breakpoints={{
          768: { spaceBetween: 20 },
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          updateSliderState(swiper);
        }}
        onProgress={updateSliderState}
        onSlideChange={updateSliderState}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        onFromEdge={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="!w-[calc(100vw-2rem)] sm:!w-[calc(50vw-1.75rem)] md:!w-[calc(34vw-1.25rem)] lg:!w-[calc(33.333vw-1rem)]"
          >
            <Link
              to={`/products/${product.id}`}
              className="group/product-card flex w-full flex-col items-center text-center outline-none"
            >
              <ProductImagePair
                images={product.images}
                title={product.title}
                className="mb-5 bg-transparent"
              />
              <h3 className="font-assistant text-[15px] md:text-[13px] font-semibold uppercase tracking-[3px] text-[#121212] leading-none mb-1">
                {product.title}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative mx-auto mt-8 h-[2px] w-64 overflow-hidden bg-black/10 md:mt-12">
        <div
          className="absolute bottom-0 left-0 top-0 bg-gh-gold transition-transform duration-150"
          style={{
            width: "40%",
            transform: `translateX(${scrollProgress * 150}%)`,
          }}
        />
      </div>
    </div>
  );
}
