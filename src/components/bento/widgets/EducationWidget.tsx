import { usePortfolioData } from "../../../data/usePortfolioData";

interface EducationWidgetProps {
  isExpanded: boolean;
}

const EducationWidget = ({ isExpanded }: EducationWidgetProps) => {
  const { data } = usePortfolioData();

  return (
    <div className="education-widget">
      <span className="widget-label">Formation</span>
      <div className="education-widget__list">
        {data.education.map((edu) => (
          <div key={edu.id} className="education-widget__item">
            <h3 className="education-widget__title">{edu.title}</h3>
            <span className="education-widget__school">{edu.school}</span>
            {isExpanded && (
              <>
                <span className="education-widget__year">{edu.year}</span>
                <p className="education-widget__description">{edu.description}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationWidget;
