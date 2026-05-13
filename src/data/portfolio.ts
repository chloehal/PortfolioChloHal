export interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
}

export interface Education {
  id: string;
  title: string;
  school: string;
  year: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Quality {
  id: string;
  title: string;
  description: string;
}

export interface HeroLink {
  label: string;
  url: string;
}

export interface PortfolioData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    links: HeroLink[];
  };
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
  qualities: Quality[];
}

export const defaultData: PortfolioData = {
  hero: {
    title: "Chloé Halloin",
    subtitle: "Product Designer · Design Engineer",
    description:
      "Je conçois des produits et je code mes designs. De la recherche utilisateur à la livraison des composants, je couvre tout le spectre : UX research, product design, design systems et implémentation des éléments interactifs. Mon approche ? Des produits où le design ne s'arrête pas à la maquette. Je crée des interfaces, des animations et des design systems, puis je les implémente en React/TypeScript pour qu'ils soient prêts à l'emploi. Mon objectif : réduire les frictions entre le design et le code, en garantissant une cohérence parfaite entre l'intention et le résultat final.",
    links: [
      {
        label: "LinkedIn ↗",
        url: "https://www.linkedin.com/in/chlo%C3%A9-halloin/",
      },
      {
        label: "GitHub ↗",
        url: "https://github.com/ChloeHal",
      },
      {
        label: "Email ↗",
        url: "mailto:hey@chlohal.com",
      },
      {
        label: "X ↗",
        url: "https://x.com/chlohal",
      },
      {
        label: "CV ↗",
        url: "CV-ChloeHalloin.pdf",
      },
    ],
  },
  experiences: [
    {
      id: "exp-0",
      period: "Mai 2026 — présent",
      title: "Design Engineer Indépendante",
      company: "Enobase",
      description:
        "Conception UX/UI et design engineering en indépendante pour le générateur d'ERP Enobase.",
    },
    {
      id: "exp-1",
      period: "Janvier 2026 — Avril 2026",
      title: "Design Engineer Trainee",
      company: "Enobase",
      description:
        "Conception UX/UI pour un générateur d'ERP, avec un focus sur l'optimisation des flux utilisateurs et l'amélioration de l'efficacité opérationnelle.",
    },
    {
      id: "exp-2",
      period: "Août 2023 — Septembre 2025",
      title: "Front-End Designer & Web Developer",
      company: "Vertical Design",
      description:
        "Gestion de projets web sur mesure de bout en bout, de la conception UX/UI et du prototypage jusqu'au développement, au déploiement et à l'hébergement ainsi que la maintenance et l'accompagnement pour la prise en main.",
    },
    {
      id: "exp-3",
      period: "Juillet — Août 2023",
      title: "UX/UI Design Trainee & Web Developer",
      company: "Codika.io",
      description:
        "Conception UX/UI pour des interfaces mobiles, avec un focus sur l'expérience utilisateur, la clarté des parcours et l'engagement au quotidien.",
    },
    {
      id: "exp-4",
      period: "Janvier 2021 — Décembre 2022",
      title: "Webdesigner",
      company: "DixNeuf 90",
      description:
        "Design UX/UI et création d'identités de marque cohérentes pour des produits digitaux.",
    },
    {
      id: "exp-5",
      period: "Octobre 2020 — Avril 2021",
      title: "e-Commerce Intern",
      company: "Distriplus (Di & Planet Parfum)",
      description:
        "Conception UX/UI et élaboration de concepts digitaux innovants, depuis l'idée initiale jusqu'aux prototypes fonctionnels.",
    },
    {
      id: "exp-6",
      period: "Mars 2019 — Août 2023",
      title: "Executive Director & Graphic Designer",
      company: "Thé OK! ASBL",
      description:
        "Direction d'une organisation à but non lucratif de 15 membres dédiée à la sensibilisation et à l'éducation autour du consentement. Création de supports visuels pour les réseaux sociaux et les supports imprimés.",
    },
    {
      id: "exp-7",
      period: "Février — Mai 2019",
      title: "Trainee in the Webshop Team",
      company: "MCS Kick & Rush",
      description:
        "Création de supports imprimés et digitaux : cartes de visite, flyers, affiches et newsletters. Direction artistique pour la création de sites web, contribution à la mise en place d'Odoo, et rédaction de contenus optimisés pour le référencement (SEO).",
    },
  ],
  education: [
    {
      id: "edu-0",
      title: "Web Animations",
      school: "animations.dev",
      year: "2025",
      description:
        "Certification spécialisée en animations web : principes de motion design, springs, keyframes, performance GPU et accessibilité (prefers-reduced-motion).",
    },
    {
      id: "edu-1",
      title: "UX/UI Designer",
      school: "Interface3",
      year: "Septembre 2025 — Avril 2026",
      description:
        "Formation professionnelle axée sur le design UX/UI et l'accessibilité, combinant théorie et pratique à travers des projets concrets.",
    },
    {
      id: "edu-2",
      title: "Développement Web",
      school: "BeCode",
      year: "Novembre 2022 — Août 2023",
      description:
        "Programme intensif de formation au développement front-end, là où j'ai appris à donner vie à mes designs en code.",
    },
    {
      id: "edu-3",
      title: "Bachelier en Écriture Multimédia",
      school: "ISFSC",
      year: "Septembre 2021 — 2022",
      description:
        "Grande Distinction. Bachelier créatif à destination des métiers du web comme le marketing, le graphisme ou le web.",
    },
    {
      id: "edu-4",
      title: "Bachelier en e-Business",
      school: "EPHEC",
      year: "Septembre 2016 — Juin 2020",
      description:
        "Distinction. Bachelier permettant de développer des compétences dans les différents aspects digitaux d'un business comme le droit, la supply chain, le marketing, le développement web, les bases de données.",
    },
  ],
  skills: [
    {
      id: "skill-product",
      name: "Produit & UX",
      skills: [
        "UX Research",
        "User Interviews",
        "User Flows",
        "Wireframing",
        "Usability Testing",
        "Product Strategy",
      ],
    },
    {
      id: "skill-design",
      name: "UI & Design Systems",
      skills: [
        "Figma",
        "Design Systems",
        "UI Design",
        "Prototyping",
        "Design Tokens",
        "Motion Design",
      ],
    },
    {
      id: "skill-eng",
      name: "Design → Code",
      skills: ["React", "TypeScript", "HTML/CSS", "Tailwind"],
    },
    {
      id: "skill-methods",
      name: "Méthodes & Outils",
      skills: [
        "Agile/Scrum",
        "Git",
        "CI/CD",
        "Accessibility (WCAG)",
        "Analytics",
        "Notion",
      ],
    },
  ],
  qualities: [
    {
      id: "qual-1",
      title: "Design produit",
      description: "Recherche utilisateur, stratégie, UX/UI, prototypage.",
    },
    {
      id: "qual-2",
      title: "Design systems",
      description:
        "Création et implémentation de systèmes de composants réutilisables (Figma + code).",
    },
    {
      id: "qual-3",
      title: "Code des designs",
      description:
        "Développement des composants, animations et librairies (React, TypeScript, Storybook).",
    },
    {
      id: "qual-4",
      title: "Motion design",
      description:
        "Animations fluides et performantes (Framer Motion, CSS/JS).",
    },
    {
      id: "qual-5",
      title: "Collaboration",
      description:
        "Pont entre les équipes design et dev pour une livraison sans friction.",
    },
    {
      id: "qual-6",
      title: "Un seul interlocuteur",
      description:
        "De la discovery à la livraison des composants, je couvre tout le processus.",
    },
    {
      id: "qual-7",
      title: "Design qui vit dans le code",
      description:
        "Pas de perte d'intention entre les maquettes et l'implémentation.",
    },
    {
      id: "qual-8",
      title: "Expertise technique",
      description:
        "Je parle le langage des designers et des devs, ce qui accélère les itérations.",
    },
    {
      id: "qual-9",
      title: "Approche produit",
      description:
        "Je ne conçois pas des écrans, je résous des problèmes (basés sur des données et des insights utilisateurs).",
    },
  ],
};
