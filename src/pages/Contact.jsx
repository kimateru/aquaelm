import PageShell from "../components/PageShell";
import { CONTACT_EMAIL, ORDER_PHONE, ORDER_PHONE_DISPLAY } from "../constants/contact";

export default function Contact() {
  return (
    <PageShell mainClassName="flex flex-col justify-center pt-[calc(var(--nav-height)+1.5rem)] md:pt-24 pb-16 md:pb-28 site-gutter-x md:px-12 max-w-7xl mx-auto w-full text-left">
        <h1 className="font-ivy text-[52px] sm:text-[62px] md:text-[72px] font-light text-[#121212] mb-5 tracking-tight leading-tight">
          Contact Support
        </h1>
        
        <p className="font-assistant text-[15px] md:text-[15px] leading-relaxed text-[#121212]/70 font-light mb-12 max-w-2xl">
          If you have any questions regarding your order or our products. Please reach us via:
        </p>

        <div className="flex flex-wrap gap-x-12 md:gap-x-16 gap-y-6 items-center">

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 group outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="w-5 h-5 text-[#121212] group-hover:text-gh-gold transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <span className="font-sans text-[13px] md:text-[11px] font-semibold uppercase tracking-[2px] text-gh-dark underline underline-offset-[8px] decoration-[0.5px] group-hover:text-gh-gold group-hover:decoration-gh-gold transition-colors duration-300">
              {CONTACT_EMAIL.toUpperCase()} &gt;
            </span>
          </a>

          <a
            href={`tel:${ORDER_PHONE}`}
            className="flex items-center gap-3 group outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              className="w-5 h-5 text-[#121212] group-hover:text-gh-gold transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a8.97 8.97 0 004.965-1.49L21 20.5l-1-4.035A8.97 8.97 0 0012 3a9 9 0 00-9 9c0 1.624.43 3.146 1.185 4.465L3 20.5l4.035-1A8.97 8.97 0 0012 21z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.5 8.5c0-.5.3-.8.8-.8h.8c.3 0 .5.2.6.4l.5 1.2c.1.2 0 .5-.2.7l-.4.3c.3.5.7.9 1.2 1.2l.3-.4c.2-.2.5-.3.7-.2l1.2.5c.2.1.4.3.4.6v.8c0 .5-.3.8-.8.8-2.6 0-4.7-2.1-4.7-4.7v0z"
              />
            </svg>
            <span className="font-sans text-[13px] md:text-[11px] font-semibold uppercase tracking-[2px] text-gh-dark underline underline-offset-[8px] decoration-[0.5px] group-hover:text-gh-gold group-hover:decoration-gh-gold transition-colors duration-300">
              {ORDER_PHONE_DISPLAY} &gt;
            </span>
          </a>
        </div>
    </PageShell>
  );
}
