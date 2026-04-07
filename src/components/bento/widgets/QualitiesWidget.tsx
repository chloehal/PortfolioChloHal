import { usePortfolioData } from "../../../data/usePortfolioData";

interface QualitiesWidgetProps {
  isExpanded: boolean;
}

const QualitiesWidget = ({ isExpanded }: QualitiesWidgetProps) => {
  const { data } = usePortfolioData();

  return (
    <div className="qualities-widget">
      <span className="widget-label">Ce que j'apporte</span>
      <div className="qualities-widget__list">
        {data.qualities.map((quality) => (
          <div key={quality.id} className="qualities-widget__item">
            <h3 className="qualities-widget__title">{quality.title}</h3>
            {isExpanded && (
              <p className="qualities-widget__description">{quality.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualitiesWidget;
