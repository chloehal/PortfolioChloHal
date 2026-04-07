import { useRef, useEffect, useCallback, useState } from "react";

interface TypoRevealProps {
  children: React.ReactNode;
}

const RADIUS = 100;
const DISTORT_BAND = 14;

const TypoReveal = ({ children }: TypoRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: -999, y: -999 });
  const [isInside, setIsInside] = useState(false);

  const updatePosition = useCallback(() => {
    const clone = cloneRef.current;
    const edge = edgeRef.current;
    const { x, y } = mousePos.current;
    const outerR = RADIUS + DISTORT_BAND;

    if (clone) {
      clone.style.clipPath = `circle(${outerR}px at ${x}px ${y}px)`;
    }
    if (edge) {
      // Ring mask: visible only between RADIUS-2 and outerR
      edge.style.clipPath = `circle(${outerR}px at ${x}px ${y}px)`;
      edge.style.setProperty("--ring-cx", `${x}px`);
      edge.style.setProperty("--ring-cy", `${y}px`);
      edge.style.opacity = "1";
    }
    rafRef.current = 0;
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  }, [updatePosition]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      scheduleUpdate();
    },
    [scheduleUpdate]
  );

  const handleMouseEnter = useCallback(() => setIsInside(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsInside(false);
    mousePos.current = { x: -999, y: -999 };
    if (cloneRef.current) {
      cloneRef.current.style.clipPath = `circle(0px at -999px -999px)`;
    }
    if (edgeRef.current) {
      edgeRef.current.style.opacity = "0";
      edgeRef.current.style.clipPath = `circle(0px at -999px -999px)`;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <div className="typo-reveal" ref={containerRef}>
      {/* SVG filter for lens edge distortion */}
      <svg className="typo-reveal__svg" aria-hidden="true">
        <defs>
          <filter id="typo-lens-distort" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              seed="5"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Base layer — default typography */}
      <div className="typo-reveal__base">{children}</div>

      {/* Clone layer — alt typography, covers full circle + edge band */}
      <div
        ref={cloneRef}
        className={`typo-reveal__clone ${isInside ? "typo-reveal__clone--active" : ""}`}
        aria-hidden="true"
        style={{ clipPath: "circle(0px at -999px -999px)" }}
      >
        {children}
      </div>

      {/* Edge distortion layer — same alt typo, with SVG warp, only visible on the ring edge */}
      <div
        ref={edgeRef}
        className={`typo-reveal__edge ${isInside ? "typo-reveal__edge--active" : ""}`}
        aria-hidden="true"
        style={{ clipPath: "circle(0px at -999px -999px)", opacity: 0 }}
      >
        {children}
      </div>
    </div>
  );
};

export default TypoReveal;
