import { useRef, useEffect } from "react";
import Hls from "hls.js";

const HLS_VIDEO_URL =
  "https://gourmethouse.com/cdn/shop/videos/c/vp/f4c32831fcc545069ff7bcaa44e2b2b4/f4c32831fcc545069ff7bcaa44e2b2b4.m3u8?v=0";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_VIDEO_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Autoplay blocked:", e));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_VIDEO_URL;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Autoplay blocked:", e));
      });
    }
  }, []);

  return (
    <div className="relative w-full section-viewport overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
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
