import { usePortfolioData } from "../../../data/usePortfolioData";

const HeroWidget = () => {
  const { data } = usePortfolioData();

  return (
    <div className="hero-widget">
      <h1 className="hero-widget__title">{data.hero.title}</h1>
      <h2 className="hero-widget__subtitle">{data.hero.subtitle}</h2>
      <p className="hero-widget__description">{data.hero.description}</p>
    </div>
  );
};

export default HeroWidget;
