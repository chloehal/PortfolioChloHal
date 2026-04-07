import BentoGrid from "../components/bento/BentoGrid";
import { useSEO } from "../hooks/useSEO";

const Moi = () => {
  useSEO({
    title: "Chloé Halloin — Product Designer & Design Engineer",
    description:
      "Portfolio de Chloé Halloin — Product Designer & Design Engineer. Découvrez mes projets, compétences et expérimentations.",
  });

  return <BentoGrid />;
};

export default Moi;
