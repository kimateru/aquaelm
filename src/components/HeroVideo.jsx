import { HERO_VIDEO_URL } from "../constants/media";

export default function HeroVideo() {
  return (
    <div className="relative w-full section-viewport-hero overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={HERO_VIDEO_URL}
        muted
        loop
        playsInline
        autoPlay
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 select-none pointer-events-none z-10">
        <h6 className="font-sans text-[11px] font-semibold uppercase tracking-[4px] text-gh-dark">
          Discover
        </h6>
        <div className="w-[1px] h-[70px] bg-gh-dark/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gh-brown animate-scroll-down"></div>
        </div>
      </div>
    </div>
  );
}
