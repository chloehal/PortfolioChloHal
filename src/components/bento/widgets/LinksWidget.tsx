import { usePortfolioData } from "../../../data/usePortfolioData";
import {
  Linkedin,
  Github,
  Mail,
  Twitter,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "LinkedIn ↗": Linkedin,
  "GitHub ↗": Github,
  "Email ↗": Mail,
  "X ↗": Twitter,
  "CV ↗": FileText,
};

const LinksWidget = () => {
  const { data } = usePortfolioData();

  return (
    <div className="links-widget">
      <span className="widget-label">Liens</span>
      <div className="links-widget__grid">
        {data.hero.links.map((link) => {
          const Icon = ICON_MAP[link.label];
          return (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="links-widget__link"
              aria-label={link.label.replace(" ↗", "")}
            >
              {Icon && <Icon size={18} aria-hidden="true" />}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default LinksWidget;
