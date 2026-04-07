import {
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
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Sector {
  name: string;
  icon: LucideIcon;
}

const SECTORS: Sector[] = [
  { name: "Loisirs", icon: Gamepad2 },
  { name: "Fleuriste", icon: Flower2 },
  { name: "Vin", icon: Wine },
  { name: "Boxe", icon: Dumbbell },
  { name: "Immobilier", icon: House },
  { name: "Médias", icon: Megaphone },
  { name: "Agence Web", icon: Code2 },
  { name: "Musique", icon: Mic },
  { name: "Production", icon: Clapperboard },
  { name: "Peluches", icon: Heart },
  { name: "Joaillerie", icon: Gem },
  { name: "Catering", icon: UtensilsCrossed },
];

interface SectorsWidgetProps {
  isExpanded: boolean;
}

const SectorsWidget = ({ isExpanded }: SectorsWidgetProps) => {
  if (isExpanded) {
    return (
      <div className="sectors-widget">
        <span className="widget-label">Secteurs</span>
        <div className="sectors-widget__expanded">
          {SECTORS.map((sector) => {
            const Icon = sector.icon;
            return (
              <div key={sector.name} className="sectors-widget__chip">
                <Icon size={13} aria-hidden="true" />
                <span>{sector.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact: double the list for seamless infinite scroll
  const doubled = [...SECTORS, ...SECTORS];

  return (
    <div className="sectors-widget">
      <span className="widget-label">Secteurs</span>
      <div className="sectors-widget__marquee">
        <div className="sectors-widget__track">
          {doubled.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <div
                key={`${sector.name}-${i}`}
                className="sectors-widget__icon-item"
                title={sector.name}
              >
                <Icon size={15} aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectorsWidget;
