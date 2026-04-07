import { usePortfolioData } from "../../../data/usePortfolioData";

interface ExperienceWidgetProps {
  isExpanded: boolean;
}

const ExperienceWidget = ({ isExpanded }: ExperienceWidgetProps) => {
  const { data } = usePortfolioData();

  return (
    <div className="experience-widget">
      <span className="widget-label">Experience</span>
      <div className="experience-widget__list">
        {data.experiences.map((exp) => (
          <div key={exp.id} className="experience-widget__item">
            <span className="experience-widget__period">{exp.period}</span>
            <h3 className="experience-widget__title">{exp.title}</h3>
            <span className="experience-widget__company">{exp.company}</span>
            {isExpanded && (
              <p className="experience-widget__description">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceWidget;
