import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useSector } from "../../../contexts/SectorContext";
import {
  Sparkles,
  Gamepad2,
  Flower2,
  Wine,
  Dumbbell,
  House,
  Megaphone,
  Code2,
  Mic,
  Clapperboard,
  Heart,
  Gem,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SectorDef {
  id: string;
  name: string;
  icon: LucideIcon;
}

const ALL_SECTORS: SectorDef[] = [
  { id: "default", name: "Défaut", icon: Sparkles },
  { id: "leisure", name: "Loisirs", icon: Gamepad2 },
  { id: "florist", name: "Fleuriste", icon: Flower2 },
  { id: "wine", name: "Vin", icon: Wine },
  { id: "boxing", name: "Boxe", icon: Dumbbell },
  { id: "realestate", name: "Immobilier", icon: House },
  { id: "media", name: "Médias", icon: Megaphone },
  { id: "webagency", name: "Agence Web", icon: Code2 },
  { id: "singer", name: "Musique", icon: Mic },
  { id: "production", name: "Production", icon: Clapperboard },
  { id: "plushies", name: "Peluches", icon: Heart },
  { id: "jewelry", name: "Joaillerie", icon: Gem },
];

const SectorThemeWidget = () => {
  const { currentSector, onSectorChange } = useSector();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const current = ALL_SECTORS.find((s) => s.id === currentSector) || ALL_SECTORS[0];
  const CurrentIcon = current.icon;

  const close = useCallback(() => setIsOpen(false), []);

  // Position the portal dropdown relative to the trigger
  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: rect.left,
      width: Math.max(rect.width, 180),
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) return;
      close();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  const handleSelect = (id: string) => {
    onSectorChange(id);
    close();
  };

  return (
    <div className="sector-widget">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="sector-widget__trigger"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Changer de thème secteur"
      >
        <CurrentIcon size={16} aria-hidden="true" />
        <span className="sector-widget__current">{current.name}</span>
        <ChevronDown
          size={12}
          aria-hidden="true"
          className={`sector-widget__arrow ${isOpen ? "sector-widget__arrow--open" : ""}`}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="sector-widget__dropdown"
            role="listbox"
            aria-label="Secteurs"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: pos.width,
            }}
          >
            {ALL_SECTORS.map((sector) => {
              const Icon = sector.icon;
              return (
                <button
                  key={sector.id}
                  className={`sector-widget__option ${currentSector === sector.id ? "sector-widget__option--active" : ""}`}
                  onClick={() => handleSelect(sector.id)}
                  role="option"
                  aria-selected={currentSector === sector.id}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{sector.name}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
};

export default SectorThemeWidget;
