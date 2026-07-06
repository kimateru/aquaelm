import { HERO_VIDEO_URL } from "../constants/media";

export default function PageHeroVideo({ title, titleClassName }) {
  return (
    <div className="relative w-full section-viewport-hero overflow-hidden bg-[#121212]">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-95"
        src={HERO_VIDEO_URL}
        muted
        loop
        playsInline
        autoPlay
      />
      <div className="absolute inset-0 bg-black/5 z-10" />
      {title ? (
        <div className="absolute inset-0 flex items-center justify-center z-20 select-none pointer-events-none">
          <h1 className={titleClassName}>{title}</h1>
        </div>
      ) : null}
    </div>
  );
}
