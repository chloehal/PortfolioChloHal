import type { SkillCategory } from "../../../data/portfolio";

interface SkillsWidgetProps {
  category: SkillCategory;
  isExpanded?: boolean;
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "skill-product": "De la recherche à la stratégie produit",
  "skill-design": "Figma, design tokens et systèmes de composants",
  "skill-eng": "Je code mes propres designs",
  "skill-methods": "Process, outils et collaboration",
};

const CATEGORY_DETAILS: Record<string, string> = {
  "skill-product":
    "Mon approche produit commence par la compréhension des utilisateurs. Je mène des interviews, cartographie les parcours et traduis les insights en décisions de design concrètes.",
  "skill-design":
    "Je construis des systèmes de design cohérents et scalables — des tokens aux composants — en garantissant la parité entre Figma et le code.",
  "skill-eng":
    "Je ne m'arrête pas à la maquette. Je code les composants, les animations et les interactions en React et TypeScript.",
  "skill-methods":
    "Agile, versioning, CI/CD, accessibilité WCAG et analytics — les fondations pour livrer du design de qualité en continu.",
};

const SkillsWidget = ({ category, isExpanded }: SkillsWidgetProps) => {
  return (
    <div className="skills-widget">
      <span className="widget-label">Compétences</span>
      <h3 className="skills-widget__title">{category.name}</h3>
      <p className="skills-widget__description">
        {CATEGORY_DESCRIPTIONS[category.id] || ""}
      </p>
      <div className="skills-widget__tags">
        {category.skills.map((skill) => (
          <span key={skill} className="skills-widget__tag">
            {skill}
          </span>
        ))}
      </div>
      {isExpanded && CATEGORY_DETAILS[category.id] && (
        <p className="skills-widget__detail">
          {CATEGORY_DETAILS[category.id]}
        </p>
      )}
    </div>
  );
};

export default SkillsWidget;
