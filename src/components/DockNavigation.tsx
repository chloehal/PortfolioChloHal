import { useLayoutEffect, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Bookmark,
  FlaskConical,
  PenLine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DockTab {
  name: string;
  icon: LucideIcon;
  path: string;
}

const TABS: DockTab[] = [
  { name: "Moi", icon: User, path: "/" },
  { name: "Blog", icon: PenLine, path: "/blog" },
  { name: "Laboratoire", icon: FlaskConical, path: "/laboratoire" },
  { name: "Bookmarks", icon: Bookmark, path: "/bookmarks" },
];

const DockNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = TABS.find((t) => t.path === location.pathname)?.name || TABS[0].name;
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLButtonElement>(null);

  const updateClipPath = useCallback(() => {
    const container = containerRef.current;
    const activeTabElement = activeTabElementRef.current;
    if (!container || !activeTabElement) return;

    const { offsetLeft, offsetWidth } = activeTabElement;
    const clipLeft = offsetLeft;
    const clipRight = offsetLeft + offsetWidth;

    container.style.clipPath = `inset(0 ${Number(
      100 - (clipRight / container.offsetWidth) * 100
    ).toFixed()}% 0 ${Number(
      (clipLeft / container.offsetWidth) * 100
    ).toFixed()}%)`;
  }, []);

  useLayoutEffect(() => {
    updateClipPath();
  }, [activeTab, updateClipPath]);

  useEffect(() => {
    const handleResize = () => updateClipPath();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateClipPath]);

  const handleClick = (tab: DockTab) => {
    navigate(tab.path);
  };

  return (
    <nav className="dock-nav" aria-label="Navigation rapide">
      <div className="dock-wrapper">
        <ul className="dock-list">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.name}>
                <button
                  ref={activeTab === tab.name ? activeTabElementRef : null}
                  data-tab={tab.name}
                  onClick={() => handleClick(tab)}
                  className="dock-btn"
                  aria-current={activeTab === tab.name ? "page" : undefined}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="dock-label">{tab.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-hidden="true" className="dock-clip" ref={containerRef}>
          <ul className="dock-list dock-list-active">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.name}>
                  <button
                    data-tab={tab.name}
                    onClick={() => handleClick(tab)}
                    className="dock-btn dock-btn-active"
                    tabIndex={-1}
                  >
                    <Icon size={16} />
                    <span className="dock-label">{tab.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DockNavigation;
