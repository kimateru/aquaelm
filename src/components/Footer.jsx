import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function fitWordmarkToContainer(container, text) {
  const maxWidth = container.clientWidth;
  if (maxWidth <= 0) return;

  let lo = 48;
  let hi = Math.min(maxWidth, 512);

  text.style.fontSize = `${hi}px`;
  if (text.scrollWidth <= maxWidth) return;

  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    text.style.fontSize = `${mid}px`;
    if (text.scrollWidth > maxWidth) {
      hi = mid;
    } else {
      lo = mid;
    }
  }

  text.style.fontSize = `${lo}px`;
}

function FooterWordmark() {
  const wrapRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const text = textRef.current;
      if (!wrap || !text) return;
      fitWordmarkToContainer(wrap, text);
    };

    fit();
    document.fonts?.ready.then(fit).catch(() => {});

    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);

    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full pt-4 md:pt-6">
      <Link to="/" className="block outline-none w-full">
        <span ref={textRef} className="footer-wordmark">
          AQUAELM
        </span>
      </Link>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="brand-surface bg-aquaelm-blue text-white select-none border-t border-aquaelm-accent/20 pt-14 pb-8 md:pb-10">
      <div className="site-gutter flex flex-col brand-surface bg-aquaelm-blue">
        <div className="flex flex-col md:flex-row md:flex-nowrap md:justify-between gap-10 md:gap-6 items-start w-full pb-10 md:pb-12 border-b border-aquaelm-accent/20">
          <div className="flex flex-col gap-4 shrink-0">
            <h5 className="footer-heading">Explore</h5>
            <ul className="flex flex-col gap-2.5 font-assistant font-light">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/pages/about-us" className="footer-link">Our Story</Link></li>
              <li><Link to="/collections/all" className="footer-link">Our Shop</Link></li>
              <li><Link to="/pages/contact-us" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <h5 className="footer-heading">Socials</h5>
            <ul className="flex flex-col gap-2.5 font-assistant font-light">
              <li>
                <a
                  href="https://www.instagram.com/gourmethousedeli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/gourmethousecaviar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full pt-6 md:pt-8 pb-2 text-aquaelm-accent-soft/70 font-assistant text-xs font-light">
          <span>&copy; {new Date().getFullYear()} Aquaelm</span>
        </div>

        <FooterWordmark />
      </div>
    </footer>
  );
}
