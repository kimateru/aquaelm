import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeroVideo from "../components/PageHeroVideo";
import FogRevealText, { FogRevealBlock } from "../components/FogRevealText";
import fishGraphic from "../assets/Fish_Graphic.webp";

const STORY_TEXT =
  "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit. Ut enim ad\nminim veniam, quis nostrud exercitation.";

const QUALITY_TEXT =
  "Lorem ipsum dolor,\nsit amet consectetur,\nadipiscing elit,\nsed do eiusmod.";

const QUALITY_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const PARTNERS_TEXT =
  "Lorem ipsum dolor\nsit amet consectetur,\nadipiscing elit sed.\nDo eiusmod tempor\nincididunt ut.";

const PARTNERS_DESCRIPTION =
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.\nTotam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

const SUSTAINABILITY_TEXT = "Lorem ipsum, dolor sit\namet consectetur\nadipiscing";

const SUSTAINABILITY_DESCRIPTION =
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\nEt harum quidem rerum facilis est et expedita distinctio.";

export default function OurStory() {
  return (
    <PageShell>
        <PageHeroVideo
          title="Our Story"
          titleClassName="font-ivy text-[48px] sm:text-[68px] md:text-[84px] font-light text-white tracking-normal text-center"
        />

        <div
          id="story-statement-section"
          className="relative section-content py-14 md:py-28 site-gutter-x md:px-12 flex flex-col items-center text-center bg-white overflow-hidden justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <img
              src={fishGraphic}
              alt=""
              className="w-[95%] md:w-[85%] max-w-[650px] aspect-square object-contain opacity-80"
            />
          </div>

          <div className="relative z-10 max-w-6xl w-full flex flex-col items-center gap-7">
            <h6 className="eyebrow-label">
              OUR CAVIAR
            </h6>

            <FogRevealText
              as="h4"
              text={STORY_TEXT}
              className="font-ivy text-[28px] sm:text-[32px] md:text-[38px] lg:text-[46px] text-[#121212] leading-[1.35] font-light max-w-[1100px] mx-auto whitespace-pre-line"
            />

            <div className="mt-4">
              <Link
                to="/pages/about-us"
                className="cta-link text-gh-gold"
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
          className="flex flex-col border-t border-black/5 bg-white md:relative md:min-h-screen md:overflow-hidden md:bg-gh-gray"
        >
          <div className="relative h-[50vh] w-full shrink-0 overflow-hidden md:pointer-events-none md:absolute md:inset-0 md:h-full md:z-0">
            <img
              src="https://gourmethouse.com/cdn/shop/files/quality-full-width.jpg?v=1767987269&width=1500"
              alt="Quality and Sustainability"
              className="h-full w-full object-cover object-center select-none md:absolute md:inset-0"
            />
          </div>

          <div className="relative z-10 w-full site-gutter-x py-10 md:absolute md:inset-0 md:mx-auto md:flex md:max-w-7xl md:items-center md:justify-end md:px-12 md:py-0 lg:px-20">
            <div className="flex w-full flex-col items-start gap-4 text-left md:max-w-xl md:gap-5">
              <h6 className="eyebrow-label">
                OUR PROMISE
              </h6>

              <FogRevealText
                as="h2"
                text={QUALITY_TEXT}
                className="font-ivy text-[34px] sm:text-[38px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.15] font-light whitespace-pre-line"
              />

              <FogRevealBlock
                as="p"
                delay={0.25}
                className="font-assistant text-[14px] leading-relaxed text-[#121212]/75 font-light max-w-xl"
                text={QUALITY_DESCRIPTION}
              />
            </div>
          </div>
        </div>

        <div
          id="story-partners-section"
          className="flex flex-col border-t border-black/5 bg-white md:relative md:min-h-screen md:overflow-hidden md:bg-gh-gray"
        >
          <div className="relative h-[50vh] w-full shrink-0 overflow-hidden md:pointer-events-none md:absolute md:inset-0 md:h-full md:z-0">
            <img
              src="https://gourmethouse.com/cdn/shop/files/lab-full-width.jpg?v=1767987388&width=1500"
              alt="Our Partners Lab"
              className="h-full w-full object-cover object-center select-none md:absolute md:inset-0"
            />
          </div>

          <div className="relative z-10 w-full site-gutter-x py-10 md:absolute md:inset-0 md:mx-auto md:flex md:max-w-7xl md:items-center md:px-12 md:py-0 lg:px-20">
            <div className="flex w-full flex-col items-start gap-4 text-left md:max-w-2xl md:gap-5">
              <h6 className="eyebrow-label">
                OUR PARTNERS
              </h6>

              <FogRevealText
                as="h2"
                text={PARTNERS_TEXT}
                className="font-ivy text-[34px] sm:text-[38px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.15] font-light whitespace-pre-line"
              />

              <FogRevealBlock
                as="p"
                delay={0.25}
                className="font-assistant text-[14px] leading-relaxed text-[#121212]/75 font-light max-w-xl"
                text={PARTNERS_DESCRIPTION}
              />
            </div>
          </div>
        </div>

        <div
          id="story-sustainability-section"
          className="flex flex-col border-t border-black/5 bg-white md:relative md:min-h-screen md:overflow-hidden md:bg-gh-gray"
        >
          <div className="relative h-[50vh] w-full shrink-0 overflow-hidden md:pointer-events-none md:absolute md:inset-0 md:h-full md:z-0">
            <img
              src="https://gourmethouse.com/cdn/shop/files/about_sustainability.png?v=1772201126&width=1500"
              alt="Slow by Design Sustainability"
              className="h-full w-full object-cover object-center select-none md:absolute md:inset-0"
            />
          </div>

          <div className="relative z-10 w-full site-gutter-x py-10 md:absolute md:inset-0 md:mx-auto md:flex md:max-w-7xl md:items-center md:justify-end md:px-12 md:py-0 lg:px-20">
            <div className="flex w-full flex-col items-start gap-4 text-left md:max-w-2xl md:gap-5">
              <h6 className="eyebrow-label">
                SLOW BY DESIGN
              </h6>

              <FogRevealText
                as="h2"
                text={SUSTAINABILITY_TEXT}
                className="font-ivy text-[34px] sm:text-[38px] md:text-[54px] lg:text-[60px] text-[#121212] leading-[1.15] font-light whitespace-pre-line"
              />

              <FogRevealBlock
                as="p"
                delay={0.25}
                className="font-assistant text-[14px] leading-relaxed text-[#121212]/75 font-light max-w-xl"
                text={SUSTAINABILITY_DESCRIPTION}
              />
            </div>
          </div>
        </div>
    </PageShell>
  );
}
