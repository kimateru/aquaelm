import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, active };
}

function LineReveal({ children, active, delay = 0, className = "" }) {
  return (
    <span className={`line-reveal-mask ${className}`}>
      <span
        className={`line-reveal-inner ${active ? "line-reveal-inner--active" : ""}`}
        style={
          active
            ? { animationDelay: `${delay}s` }
            : undefined
        }
      >
        {children}
      </span>
    </span>
  );
}

function splitIntoLines(content) {
  if (typeof content === "string") {
    return content.split("\n").filter((line) => line.length > 0 || content.includes("\n"));
  }
  return null;
}

/**
 * Line-by-line reveal: full text in DOM from the start (no layout jump).
 * Each line sweeps in left → right from nothing; soft mask edge = fog.
 */
export default function FogRevealText({
  text,
  children,
  as: Tag = "span",
  className = "",
  threshold = 0.15,
  stagger = 0.24,
  splitLines = true,
  delay = 0,
}) {
  const { ref, active } = useInView(threshold);
  const content = children ?? text;
  const ariaLabel =
    typeof content === "string" ? content.replace(/\n/g, " ") : undefined;

  const lines = splitLines ? splitIntoLines(content) : null;

  if (lines && lines.length > 0) {
    return (
      <Tag ref={ref} className={className} aria-label={ariaLabel}>
        {lines.map((line, i) => (
          <LineReveal
            key={i}
            active={active}
            delay={delay + i * stagger}
            className={i < lines.length - 1 ? "mb-[0.08em]" : ""}
          >
            {line}
          </LineReveal>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className} aria-label={ariaLabel}>
      <LineReveal active={active} delay={delay}>
        {content}
      </LineReveal>
    </Tag>
  );
}

export function FogRevealBlock({
  children,
  text,
  className = "",
  threshold = 0.15,
  stagger = 0.22,
  delay = 0,
  as: Tag = "div",
}) {
  const { ref, active } = useInView(threshold);
  const content = text ?? children;
  const lines = splitIntoLines(content);

  if (lines && lines.length > 1) {
    return (
      <div ref={ref} className={className}>
        {lines.map((line, i) => (
          <LineReveal
            key={i}
            active={active}
            delay={delay + i * stagger}
            className={i < lines.length - 1 ? "mb-[0.65em]" : ""}
          >
            {line}
          </LineReveal>
        ))}
      </div>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      <LineReveal active={active} delay={delay}>
        {content}
      </LineReveal>
    </Tag>
  );
}
