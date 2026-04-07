import { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeWidget = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = useCallback(() => {
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;pointer-events:none;" +
      "background:" + (isDark ? "#fafafa" : "#0a0a0a") + ";" +
      "opacity:0;transition:opacity 0.3s ease";
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      overlay.addEventListener("transitionend", () => {
        setIsDark((prev) => !prev);
        requestAnimationFrame(() => {
          overlay.style.opacity = "0";
          overlay.addEventListener("transitionend", () => {
            overlay.remove();
          }, { once: true });
        });
      }, { once: true });
    });
  }, [isDark]);

  return (
    <div className="darkmode-widget">
      <button
        onClick={toggle}
        className="darkmode-widget__toggle"
        aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
        aria-pressed={isDark}
      >
        {isDark ? (
          <Sun size={24} aria-hidden="true" />
        ) : (
          <Moon size={24} aria-hidden="true" />
        )}
      </button>
      <span className="darkmode-widget__label">
        {isDark ? "Mode clair" : "Mode sombre"}
      </span>
    </div>
  );
};

export default DarkModeWidget;
