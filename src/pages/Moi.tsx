import { useState } from "react";
import { useSEO } from "../hooks/useSEO";
import { usePortfolioData } from "../data/usePortfolioData";
import { TopographicBackground } from "../components/TopographicBackground";
import "../styles/moi.css";

const Moi = () => {
  useSEO({
    title: "Chloé Halloin — Product Designer & Design Engineer",
    description:
      "Portfolio de Chloé Halloin — Product Designer & Design Engineer. Découvrez mes projets, compétences et expérimentations.",
  });

  const { data } = usePortfolioData();
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  return (
    <>
      <TopographicBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
      {/* Hero */}
      <div className="moi-hero">
        <div>
          <h1 className="moi-hero__name">{data.hero.title}</h1>
          <p className="moi-hero__role">{data.hero.subtitle}</p>
          <p className="moi-hero__location">Bruxelles, Belgique</p>
          <hr className="moi-hero__divider" aria-hidden="true" />
          <nav className="moi-hero__links" aria-label="Liens de contact">
            {data.hero.links.map((link, i) =>
              link.url.endsWith(".pdf") ? (
                <a
                  key={i}
                  href={link.url}
                  className="moi-hero__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Télécharger le CV"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={i}
                  href={link.url}
                  className="moi-hero__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>

        {photoError ? (
          <div className="moi-hero__photo-fallback" aria-hidden="true">CH</div>
        ) : (
          <img
            src="/chloe.png"
            alt="Photo de Chloé Halloin"
            className={`moi-hero__photo${photoLoaded ? " moi-hero__photo--loaded" : ""}`}
            onLoad={() => setPhotoLoaded(true)}
            onError={() => setPhotoError(true)}
          />
        )}
      </div>

      <hr className="section-divider" aria-hidden="true" />

      {/* Expérience */}
      <section className="moi-section" id="experience" aria-label="Expérience professionnelle">
        <div className="moi-section__header">
          <span className="moi-section__num">01</span>
          <h2 className="moi-section__title">Expérience</h2>
        </div>
        <div className="moi-timeline">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="moi-timeline-item">
              <span className="moi-timeline-item__period">{exp.period.split(" — ")[0]}</span>
              <h3 className="moi-timeline-item__title">{exp.title}</h3>
              <p className="moi-timeline-item__company">{exp.company}</p>
              <p className="moi-timeline-item__desc">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" aria-hidden="true" />

      {/* Formation */}
      <section className="moi-section" id="education" aria-label="Formation">
        <div className="moi-section__header">
          <span className="moi-section__num">02</span>
          <h2 className="moi-section__title">Formation</h2>
        </div>
        <div className="moi-timeline">
          {data.education.map((edu) => (
            <div key={edu.id} className="moi-timeline-item">
              <span className="moi-timeline-item__period">{edu.year.split(" — ")[0]}</span>
              <h3 className="moi-timeline-item__title">{edu.title}</h3>
              <p className="moi-timeline-item__company">{edu.school}</p>
              <p className="moi-timeline-item__desc">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" aria-hidden="true" />

      {/* Compétences */}
      <section className="moi-section" id="skills" aria-label="Compétences">
        <div className="moi-section__header">
          <span className="moi-section__num">03</span>
          <h2 className="moi-section__title">Compétences</h2>
        </div>
        <div className="moi-skills">
          {data.skills.map((category) => (
            <div key={category.id} className="moi-skills__cell">
              <p className="moi-skills__category">{category.name}</p>
              <div className="moi-skills__tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="moi-skills__tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" aria-hidden="true" />

      {/* Qualités */}
      <section className="moi-section" id="qualities" aria-label="Qualités">
        <div className="moi-section__header">
          <span className="moi-section__num">04</span>
          <h2 className="moi-section__title">Qualités</h2>
        </div>
        <div className="moi-qualities">
          {data.qualities.map((quality) => (
            <div key={quality.id}>
              <h3 className="moi-quality__title">{quality.title}</h3>
              <p className="moi-quality__desc">{quality.description}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </>
  );
};

export default Moi;
