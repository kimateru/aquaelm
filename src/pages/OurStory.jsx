import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hls from "hls.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import fishGraphic from "../assets/Fish_Graphic.webp";

const STORY_TEXT = "Yes, it's excessive. That's the point. For more than 50\nyears, Aquaelm has left the people who want\nfor nothing wanting more.";

const QUALITY_TEXT = "Uncompromising\nquality, with\nuncompromising\nsustainability.";

const PARTNERS_TEXT = "Your most\nwell-fed friend\nmay not know us\nby name. But his\nchef does.";

const PARTNERS_DESCRIPTION = "Around the world, discerning palates demand Aquaelm. As a direct supplier, we collaborate with world-class restaurants, luxury hospitality brands, and global travel partners who seek to create experiences of unparalleled excellence. Their experts trust our experts. From breeding and harvesting to curing and packaging, they know every detail is carefully considered with their clients in mind.";

const SUSTAINABILITY_TEXT = "Caviar, without\ncompromise or\nacceleration";

const SUSTAINABILITY_DESCRIPTION = "We source from farms operating closed and semi-closed water systems with continuous filtration, oxygen regulation, low stocking densities, and constant monitoring. Sturgeon mature naturally under strict, species-specific protocols, without hormonal acceleration or forced growth, supported by feeding programs tailored to each species and life stage. Every tin is fully traceable from roe extraction through malossol production using minimal salt and no preservatives to final packing, processed under direct supervision at farms or licensed facilities, with identical standards and quality controls across all markets.";

export default function OurStory() {
  const videoRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [typedQualityText, setTypedQualityText] = useState("");
  const [startTypingQuality, setStartTypingQuality] = useState(false);
  const [typedPartnersText, setTypedPartnersText] = useState("");
  const [startTypingPartners, setStartTypingPartners] = useState(false);
  const [typedSustainabilityText, setTypedSustainabilityText] = useState("");
  const [startTypingSustainability, setStartTypingSustainability] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoUrl = "https://gourmethouse.com/cdn/shop/videos/c/vp/6b8a10b734f14c5b95cf333911a2fe8b/6b8a10b734f14c5b95cf333911a2fe8b.m3u8?v=0";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Autoplay blocked:", e));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Autoplay blocked:", e));
      });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const element = document.getElementById("story-statement-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTypingQuality(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const element = document.getElementById("story-quality-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTypingPartners(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const element = document.getElementById("story-partners-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTypingSustainability(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const element = document.getElementById("story-sustainability-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedText(STORY_TEXT.slice(0, index + 1));
      index++;
      if (index >= STORY_TEXT.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [startTyping]);

  useEffect(() => {
    if (!startTypingQuality) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedQualityText(QUALITY_TEXT.slice(0, index + 1));
      index++;
      if (index >= QUALITY_TEXT.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [startTypingQuality]);

  useEffect(() => {
    if (!startTypingPartners) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedPartnersText(PARTNERS_TEXT.slice(0, index + 1));
      index++;
      if (index >= PARTNERS_TEXT.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [startTypingPartners]);

  useEffect(() => {
    if (!startTypingSustainability) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedSustainabilityText(SUSTAINABILITY_TEXT.slice(0, index + 1));
      index++;
      if (index >= SUSTAINABILITY_TEXT.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [startTypingSustainability]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      <Navbar />
      <main className="flex-grow flex flex-col">
        
        <div className="relative w-full section-viewport overflow-hidden bg-[#121212]">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-95"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-black/5 z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20 select-none pointer-events-none">
            <h1 className="font-ivy text-[48px] sm:text-[68px] md:text-[84px] font-light text-white tracking-normal text-center">
              Our Story
            </h1>
          </div>
        </div>

        <div
          id="story-statement-section"
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
              OUR CAVIAR
            </h6>

            <h4
              className="font-ivy text-[24px] md:text-[38px] lg:text-[46px] text-[#121212] leading-[1.35] font-light max-w-[1100px] mx-auto min-h-[110px] md:min-h-[170px] lg:min-h-[200px] whitespace-pre-line"
              aria-label={STORY_TEXT.replace(/\n/g, " ")}
            >
              {typedText}
              {typedText.length < STORY_TEXT.length && (
                <span className="inline-block w-[1.5px] h-8 bg-gh-gold ml-1 align-middle animate-pulse">
                  |
                </span>
              )}
            </h4>

            <div className="mt-4">
              <Link
                to="/collections/all"
                className="font-assistant text-xs md:text-[13px] font-semibold uppercase tracking-[0.2em] text-gh-gold transition-all duration-300 hover:text-opacity-80 relative"
              >
                <span className="inline-flex items-center gap-1.5 pb-1.5 border-b border-gh-gold">
                  ENJOY A LITTLE A LOT
                  <span className="text-[10px]">&gt;</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div
          id="story-quality-section"
          className="relative w-full section-viewport flex items-center overflow-hidden bg-[#f4f4f4] border-t border-black/5"
        >
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src="https://gourmethouse.com/cdn/shop/files/quality-full-width.jpg?v=1767987269&width=1500"
              alt="Quality and Sustainability"
              className="w-full h-full object-cover object-center select-none"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex items-center justify-end">
            <div className="max-w-[85%] sm:max-w-[60%] md:max-w-xl flex flex-col items-start text-left gap-4 md:gap-5">
              <h2 className="font-ivy text-[34px] sm:text-[44px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.2] font-light min-h-[150px] md:min-h-[220px] lg:min-h-[280px] whitespace-pre-line">
                {typedQualityText}
                {typedQualityText.length < QUALITY_TEXT.length && (
                  <span className="inline-block w-[1.5px] h-8 bg-gh-gold ml-1 align-middle animate-pulse">
                    |
                  </span>
                )}
              </h2>
            </div>
          </div>
        </div>

        <div
          id="story-partners-section"
          className="relative w-full section-viewport flex items-center overflow-hidden bg-[#f4f4f4] border-t border-black/5"
        >
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src="https://gourmethouse.com/cdn/shop/files/lab-full-width.jpg?v=1767987388&width=1500"
              alt="Our Partners Lab"
              className="w-full h-full object-cover object-center select-none"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex items-center justify-start">
            <div className="max-w-[85%] sm:max-w-[65%] md:max-w-2xl flex flex-col items-start text-left gap-4 md:gap-5">
              <h6 className="font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-gh-gold">
                OUR PARTNERS
              </h6>

              <h2 className="font-ivy text-[34px] sm:text-[44px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.2] font-light min-h-[170px] md:min-h-[240px] lg:min-h-[300px] whitespace-pre-line">
                {typedPartnersText}
                {typedPartnersText.length < PARTNERS_TEXT.length && (
                  <span className="inline-block w-[1.5px] h-8 bg-gh-gold ml-1 align-middle animate-pulse">
                    |
                  </span>
                )}
              </h2>

              <p className="font-assistant text-[12px] md:text-[14px] leading-relaxed text-[#121212]/75 font-light max-w-xl">
                {PARTNERS_DESCRIPTION}
              </p>
            </div>
          </div>
        </div>

        <div
          id="story-sustainability-section"
          className="relative w-full section-viewport flex items-center overflow-hidden bg-[#f4f4f4] border-t border-black/5"
        >
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src="https://gourmethouse.com/cdn/shop/files/about_sustainability.png?v=1772201126&width=1500"
              alt="Slow by Design Sustainability"
              className="w-full h-full object-cover object-center select-none"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex items-center justify-end">
            <div className="max-w-[85%] sm:max-w-[65%] md:max-w-2xl flex flex-col items-start text-left gap-4 md:gap-5">
              <h6 className="font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-gh-gold">
                SLOW BY DESIGN
              </h6>

              <h2 className="font-ivy text-[34px] sm:text-[44px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.2] font-light min-h-[130px] md:min-h-[180px] lg:min-h-[220px] whitespace-pre-line">
                {typedSustainabilityText}
                {typedSustainabilityText.length < SUSTAINABILITY_TEXT.length && (
                  <span className="inline-block w-[1.5px] h-8 bg-gh-gold ml-1 align-middle animate-pulse">
                    |
                  </span>
                )}
              </h2>

              <p className="font-assistant text-[12px] md:text-[14px] leading-relaxed text-[#121212]/75 font-light max-w-xl">
                {SUSTAINABILITY_DESCRIPTION}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

