import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DockNavigation from "./DockNavigation";
import ReadMeButton from "./ReadMeButton";
import { SectorContext } from "../contexts/SectorContext";
import "../styles/adaptive-portfolio.css";

const Layout = () => {
  const [currentSector, setCurrentSector] = useState("default");

  // DRAFT: sector theme switching — uncomment to re-enable
  // useEffect(() => {
  //   document.body.className = currentSector;
  // }, [currentSector]);

  const handleSectorChange = (sector: string) => {
    setCurrentSector(sector);
  };

  return (
    <SectorContext.Provider value={{ currentSector, onSectorChange: handleSectorChange }}>
    <div className="portfolio-container">
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>

      {/* Navigation */}
      <nav className="top-navigation" aria-label="Navigation principale">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="fixed-name">Chloé Halloin</span>
            <span className="status-dot" aria-hidden="true" />
            <span className="nav-status">Open to work</span>
          </div>
        </div>
        <DockNavigation />
      </nav>

      {/* Page content */}
      <main id="main-content">
        <Outlet />
      </main>

      <ReadMeButton />

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/chlo%C3%A9-halloin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span className="footer-separator">·</span>
          <a href="mailto:halloinchloe@gmail.com">Email</a>
          <span className="footer-separator">·</span>
          <a href="https://github.com/ChloeHal" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="footer-separator">·</span>
          <a href="https://x.com/chlohal" target="_blank" rel="noopener noreferrer">
            X
          </a>
        </div>
      </footer>
    </div>
    </SectorContext.Provider>
  );
};

export default Layout;
