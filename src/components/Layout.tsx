import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DockNavigation from "./DockNavigation";
import { SectorContext } from "../contexts/SectorContext";
import "../styles/adaptive-portfolio.css";

const Layout = () => {
  const [currentSector, setCurrentSector] = useState("default");

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
            <img src="/logochlohal.png" alt="Chloé Halloin" className="nav-logo-img" />
            <span className="status-badge status-badge--busy" aria-label="Statut : occupée">
              <span className="status-badge__dot" aria-hidden="true" />
              <span className="status-badge__label">Busy</span>
            </span>
          </div>
        </div>
        <DockNavigation />
      </nav>

      {/* Page content */}
      <main id="main-content">
        <Outlet />
      </main>

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
          <a href="mailto:hey@chlohal.com">Email</a>
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
