import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { useSEO } from "../hooks/useSEO";

/**
 * Builds a wobbly, hand-drawn-looking closed curve around a rectangle.
 * We walk along an ellipse and add random jitter to each point.
 */
function buildHandDrawnPath(w: number, h: number): string {
  const cx = w / 2;
  const cy = h / 2;
  const rx = w / 2 - 3;
  const ry = h / 2 - 3;
  const steps = 28;
  // Deterministic "random" based on size so it's stable per pill
  const seed = (w * 7 + h * 13) % 100;
  const jitter = (i: number, scale: number) => {
    const v = Math.sin(seed + i * 73.7) * 43758.5453;
    return ((v - Math.floor(v)) - 0.5) * scale;
  };

  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * rx + jitter(i, 1.5);
    const y = cy + Math.sin(angle) * ry + jitter(i + 50, 1.2);
    points.push([x, y]);
  }

  // Close back to first point with slight overshoot
  const first = points[0];
  points.push([first[0] + jitter(999, 1), first[1] + jitter(998, 0.8)]);

  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;

  // Catmull-Rom → cubic bezier for smooth hand-drawn curves
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[Math.min(i + 1, points.length - 1)];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    const tension = 0.3;
    const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
    const cp1y = p1[1] + (p2[1] - p0[1]) * tension;
    const cp2x = p2[0] - (p3[0] - p1[0]) * tension;
    const cp2y = p2[1] - (p3[1] - p1[1]) * tension;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }

  return d;
}

const HandCircle = ({ width, height }: { width: number; height: number }) => {
  const pad = 8;
  const w = width + pad * 2;
  const h = height + pad * 2;
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);

  const d = buildHandDrawnPath(w, h);

  useEffect(() => {
    if (pathRef.current) {
      const totalLen = pathRef.current.getTotalLength();
      setLen(totalLen);
    }
  }, [d]);

  return (
    <svg
      className="bk-hand-circle"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: -pad,
        left: -pad,
        pointerEvents: "none",
      }}
    >
      <path
        ref={pathRef}
        d={d}
        stroke="var(--p-text)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={
          len > 0
            ? {
                strokeDasharray: len,
                strokeDashoffset: len,
                animation: `bk-draw-circle 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
              }
            : { opacity: 0 }
        }
      />
    </svg>
  );
};

interface BookmarkItem {
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
}

const bookmarks: BookmarkItem[] = [
  // ── IA ──
  {
    title: "Cursor",
    url: "https://www.cursor.com",
    description: "The AI Code Editor",
    category: "IA",
    tags: ["AI", "Dev"],
  },
  {
    title: "Base44",
    url: "https://base44.com",
    description: "Build Apps with AI in Minutes",
    category: "IA",
    tags: ["AI", "Dev"],
  },
  {
    title: "Atomic AGI",
    url: "https://atomicagi.com",
    description: "AI-First SEO Analytics & Attribution",
    category: "IA",
    tags: ["AI", "SaaS"],
  },
  {
    title: "UX Pilot",
    url: "https://uxpilot.ai",
    description: "Superfast UX/UI Design with AI",
    category: "IA",
    tags: ["AI", "UX", "UI"],
  },
  {
    title: "Color AI",
    url: "https://colorai.app",
    description: "Palettes basées sur la science et la culture",
    category: "IA",
    tags: ["AI", "Couleur"],
  },

  // ── Design · Outils ──
  {
    title: "Coolors",
    url: "https://coolors.co",
    description: "Générateur de palettes de couleurs",
    category: "Design · Outils",
    tags: ["Couleur"],
  },
  {
    title: "Trycolors",
    url: "https://trycolors.com",
    description: "Mélangeur de couleurs interactif",
    category: "Design · Outils",
    tags: ["Couleur"],
  },
  {
    title: "ColorHexa",
    url: "https://www.colorhexa.com",
    description: "Encyclopédie des couleurs et conversions",
    category: "Design · Outils",
    tags: ["Couleur"],
  },
  {
    title: "Realtime Colors",
    url: "https://www.realtimecolors.com",
    description: "Visualiser des palettes sur un vrai layout",
    category: "Design · Outils",
    tags: ["Couleur", "UI"],
  },
  {
    title: "Type Scale",
    url: "https://typescale.com",
    description: "Calculateur visuel d'échelle typographique",
    category: "Design · Outils",
    tags: ["Typo"],
  },
  {
    title: "Fontjoy",
    url: "https://fontjoy.com",
    description: "Générer des pairings de polices en un clic",
    category: "Design · Outils",
    tags: ["Typo"],
  },
  {
    title: "Shader Gradient",
    url: "https://www.shadergradient.co",
    description: "Gradients 3D animés pour le web",
    category: "Design · Outils",
    tags: ["Animation", "CSS"],
  },
  {
    title: "Mockdown",
    url: "https://mockdown.design",
    description: "Éditeur de wireframes ASCII",
    category: "Design · Outils",
    tags: ["Wireframe"],
  },
  {
    title: "Wiretext",
    url: "https://wiretext.app",
    description: "Wireframes en Unicode",
    category: "Design · Outils",
    tags: ["Wireframe"],
  },
  {
    title: "Easings",
    url: "https://easings.co",
    description: "Générateur de courbes cubic-bezier",
    category: "Design · Outils",
    tags: ["Animation", "CSS"],
  },
  {
    title: "Remotion Timing",
    url: "https://www.remotion.dev/docs/transitions/timings",
    description: "Éditeur de springs, easing et interpolation",
    category: "Design · Outils",
    tags: ["Animation"],
  },
  {
    title: "animations.dev",
    url: "https://animations.dev",
    description: "Cours et playground pour les animations web",
    category: "Design · Outils",
    tags: ["Animation", "Formation"],
  },

  // ── Design · Assets ──
  {
    title: "Noun Project",
    url: "https://thenounproject.com",
    description: "Icônes pour tout",
    category: "Design · Assets",
    tags: ["Icônes"],
  },
  {
    title: "Material Icons",
    url: "https://fonts.google.com/icons",
    description: "Icônes Material Design de Google",
    category: "Design · Assets",
    tags: ["Icônes"],
  },
  {
    title: "Nucleo",
    url: "https://nucleoapp.com",
    description: "App et bibliothèque d'icônes premium",
    category: "Design · Assets",
    tags: ["Icônes"],
  },
  {
    title: "Freepik",
    url: "https://www.freepik.com",
    description: "Vecteurs, photos et PSD gratuits",
    category: "Design · Assets",
    tags: ["Illustrations", "Photos"],
  },
  {
    title: "Blush (Wavy Buddies)",
    url: "https://blush.design",
    description: "Illustrations personnalisables par Susana Salas",
    category: "Design · Assets",
    tags: ["Illustrations"],
  },
  {
    title: "Google Design",
    url: "https://design.google",
    description: "Ressources et articles design par Google",
    category: "Design · Assets",
    tags: ["UI", "Inspiration"],
  },
  {
    title: "Free Mockups",
    url: "https://www.ls.graphics/free-mockups",
    description: "Mockups gratuits haute qualité",
    category: "Design · Assets",
    tags: ["Mockup"],
  },
  {
    title: "UNCUT.wtf",
    url: "https://uncut.wtf",
    description: "Catalogue de polices gratuites",
    category: "Design · Assets",
    tags: ["Typo"],
  },
  {
    title: "SAVEE",
    url: "https://savee.it",
    description: "Sauvegarder et organiser l'inspiration visuelle",
    category: "Design · Assets",
    tags: ["Inspiration"],
  },

  // ── Inspiration ──
  {
    title: "Pinterest",
    url: "https://pinterest.com",
    description: "Moteur de découverte visuelle et moodboards",
    category: "Inspiration",
    tags: ["Inspiration", "Branding"],
  },
  {
    title: "Behance",
    url: "https://www.behance.net",
    description: "Portfolios créatifs par Adobe",
    category: "Inspiration",
    tags: ["UI", "Branding", "Inspiration"],
  },
  {
    title: "Awwwards",
    url: "https://www.awwwards.com",
    description: "Les meilleurs sites web primés",
    category: "Inspiration",
    tags: ["UI", "Inspiration"],
  },
  {
    title: "SiteInspire",
    url: "https://www.siteinspire.com",
    description: "Showcase de web design de qualité",
    category: "Inspiration",
    tags: ["UI", "Inspiration"],
  },
  {
    title: "Godly",
    url: "https://godly.website",
    description: "Curation de sites web astronomiquement bons",
    category: "Inspiration",
    tags: ["UI", "Inspiration"],
  },
  {
    title: "Lapa Ninja",
    url: "https://www.lapa.ninja",
    description: "Landing pages et ressources design",
    category: "Inspiration",
    tags: ["UI", "Inspiration"],
  },
  {
    title: "Muzli",
    url: "https://muz.li",
    description: "Extension Chrome d'inspiration design",
    category: "Inspiration",
    tags: ["UI", "Inspiration"],
  },
  {
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "La communauté design de référence",
    category: "Inspiration",
    tags: ["UI", "Branding"],
  },
  {
    title: "Mobbin",
    url: "https://mobbin.com",
    description: "Bibliothèque de patterns UI mobile et web",
    category: "Inspiration",
    tags: ["UI", "Mobile"],
  },
  {
    title: "21st.dev",
    url: "https://21st.dev",
    description: "Composants UI sidebar et navigation",
    category: "Inspiration",
    tags: ["UI", "React"],
  },
  {
    title: "Cosmos",
    url: "https://www.cosmos.so",
    description: "Moodboards et collections visuelles",
    category: "Inspiration",
    tags: ["Branding", "Inspiration"],
  },
  {
    title: "Curations Supply",
    url: "https://www.curations.supply",
    description: "Répertoire curé de curations par des experts",
    category: "Inspiration",
    tags: ["Inspiration"],
  },
  {
    title: "Sharpen",
    url: "https://sharpen.design",
    description: "Générateur de challenges design",
    category: "Inspiration",
    tags: ["UX", "Exercice"],
  },
  {
    title: "Readymag",
    url: "https://readymag.com",
    description: "Outil de design pour des sites remarquables",
    category: "Inspiration",
    tags: ["UI"],
  },
  {
    title: "All Purpose",
    url: "https://allpurpose.io",
    description: "Studio créatif — branding et digital",
    category: "Inspiration",
    tags: ["Branding"],
  },
  {
    title: "Airbnb Design",
    url: "https://airbnb.design",
    description: "Building a Visual Language — Airbnb",
    category: "Inspiration",
    tags: ["Design System", "UI"],
  },
  {
    title: "Poppi",
    url: "https://drinkpoppi.com",
    description: "Branding coloré et packaging moderne",
    category: "Inspiration",
    tags: ["Branding"],
  },
  {
    title: "Studio Mut",
    url: "https://www.studiomut.com",
    description: "Branding et graphic design, Bolzano",
    category: "Inspiration",
    tags: ["Branding"],
  },
  {
    title: "Intùiti Cards",
    url: "https://www.intùiti.it",
    description: "Cartes créatives pour débloquer l'inspiration",
    category: "Inspiration",
    tags: ["Exercice"],
  },
  {
    title: "Kreos.agency",
    url: "https://kreos.agency",
    description: "Agence design pour startups et SaaS",
    category: "Inspiration",
    tags: ["UI", "SaaS"],
  },
  {
    title: "RootCX",
    url: "https://rootcx.com",
    description: "Business apps sur mesure",
    category: "Inspiration",
    tags: ["UI", "SaaS"],
  },
  {
    title: "Paul Macgregor",
    url: "https://paulmacgregor.me",
    description: "Portfolio d'un directeur créatif",
    category: "Inspiration",
    tags: ["Branding"],
  },
  {
    title: "Campsite",
    url: "https://campsite.co",
    description: "Communication pour équipes distribuées",
    category: "Inspiration",
    tags: ["UI", "SaaS"],
  },
  {
    title: "Fayaz Ahmed",
    url: "https://fayazahmed.com",
    description: "Portfolio design & dev",
    category: "Inspiration",
    tags: ["UI"],
  },
  {
    title: "Tailark Pro",
    url: "https://pro.tailark.com/illustrations",
    description: "Illustrations Tailwind CSS",
    category: "Inspiration",
    tags: ["UI", "Illustrations"],
  },
  {
    title: "UI Labs",
    url: "https://www.uilabs.dev/",
    description: "Expérimentations UI et micro-interactions",
    category: "Inspiration",
    tags: ["UI", "Animation"],
  },
  {
    title: "60fps.design",
    url: "https://60fps.design/",
    description: "Showcase d'animations design fluides",
    category: "Inspiration",
    tags: ["Animation", "UI"],
  },
  {
    title: "Geist Introduction",
    url: "https://vercel.com/geist/introduction",
    description: "Introduction au design system Geist de Vercel",
    category: "Inspiration",
    tags: ["Design System", "UI"],
  },
  {
    title: "Linear Homepage",
    url: "https://linear.app/homepage",
    description: "Référence en craft UI — homepage Linear",
    category: "Inspiration",
    tags: ["UI", "SaaS"],
  },
  {
    title: "Working Theorys",
    url: "https://www.workingtheorys.com/p/taste-is-eating-silicon-valley",
    description: "Taste is Eating Silicon Valley — essai sur le goût en tech",
    category: "Inspiration",
    tags: ["UX", "Inspiration"],
  },
  {
    title: "Aave",
    url: "https://aave.com",
    description: "Protocole DeFi — UI crypto de référence",
    category: "Inspiration",
    tags: ["UI", "SaaS"],
  },
  {
    title: "Drops (Foundation)",
    url: "https://foundation.app",
    description: "Plateforme créative NFT — design épuré",
    category: "Inspiration",
    tags: ["UI", "Inspiration"],
  },
  {
    title: "Fluid Functionalism",
    url: "https://www.fluidfunctionalism.com",
    description: "Composants shadcn/ui avec animations fonctionnelles et purposeful motion",
    category: "Inspiration",
    tags: ["UI", "Animation", "React"],
  },
  {
    title: "Using AI as a Design Engineer",
    url: "https://jakub.kr/work/using-ai-as-a-design-engineer",
    description: "Guide pratique sur l'utilisation de l'IA dans le workflow d'un design engineer",
    category: "Inspiration",
    tags: ["AI", "UI", "UX"],
  },
  {
    title: "UI Skills",
    url: "https://www.ui-skills.com",
    description: "Skills modulaires pour polir les interfaces créées par des agents IA",
    category: "Inspiration",
    tags: ["AI", "UI", "Dev"],
  },
  {
    title: "Impeccable",
    url: "https://impeccable.style",
    description: "Skills de design frontend pour assistants IA — vocabulaire et commandes pro",
    category: "Inspiration",
    tags: ["AI", "UI", "Dev"],
  },
  {
    title: "Eye on Design",
    url: "https://eyeondesign.aiga.org",
    description: "Bold Beers, Colorful Wine Labels — AIGA",
    category: "Inspiration",
    tags: ["Branding", "Inspiration"],
  },

  // ── UX · Documentation ──
  {
    title: "Laws of UX",
    url: "https://lawsofux.com",
    description: "Principes psychologiques appliqués au design",
    category: "UX · Documentation",
    tags: ["UX", "Formation"],
  },
  {
    title: "Smashing Magazine",
    url: "https://www.smashingmagazine.com",
    description: "Articles et livres sur le front-end et l'UX",
    category: "UX · Documentation",
    tags: ["UX", "CSS", "Formation"],
  },
  {
    title: "Blog UX Republic",
    url: "https://www.ux-republic.com/blog",
    description: "Articles UX, UI, Design Thinking",
    category: "UX · Documentation",
    tags: ["UX", "Formation"],
  },
  {
    title: "Google UX Design",
    url: "https://www.coursera.org/professional-certificates/google-ux-design",
    description: "Foundations of UX Design — Coursera",
    category: "UX · Documentation",
    tags: ["UX", "Formation"],
  },
  {
    title: "Designing Fluid Interfaces",
    url: "https://developer.apple.com/videos/play/wwdc2018/803/",
    description: "WWDC18 — interactions fluides par Apple",
    category: "UX · Documentation",
    tags: ["Animation", "UX", "Mobile"],
  },
  {
    title: "Inside Framer Motion",
    url: "https://www.framer.com/motion/",
    description: "Magic Motion — layout animations React",
    category: "UX · Documentation",
    tags: ["Animation", "React"],
  },
  {
    title: "A Book Apart",
    url: "https://abookapart.com",
    description: "Livres concis sur le web design",
    category: "UX · Documentation",
    tags: ["UX", "Formation"],
  },
  {
    title: "shoogle.dev",
    url: "https://shoogle.dev",
    description: "Moteur de recherche pour shadcn/ui",
    category: "UX · Documentation",
    tags: ["UI", "React"],
  },
  {
    title: "Falc.be",
    url: "https://www.falc.be",
    description: "Facile à Lire et à Comprendre — accessibilité",
    category: "UX · Documentation",
    tags: ["Accessibilité"],
  },
  {
    title: "NV Access (NVDA)",
    url: "https://www.nvaccess.org",
    description: "Lecteur d'écran gratuit pour tester l'accessibilité",
    category: "UX · Documentation",
    tags: ["Accessibilité"],
  },
  {
    title: "User Interface Wiki",
    url: "https://www.userinterface.wiki",
    description: "Manuel vivant pour apprendre les principes d'interfaces, animation et typographie",
    category: "UX · Documentation",
    tags: ["UX", "Animation", "Formation"],
  },
  {
    title: "On Taste (Part I)",
    url: "https://medium.com/the-year-of-the-looking-glass/on-taste-part-i-1993cd56e9ac",
    description:
      "Julie Zhuo — qu'est-ce que le goût en design ? (série en 3 parties)",
    category: "UX · Documentation",
    tags: ["UX", "Formation"],
  },

  // ── Dev · Librairies ──
  {
    title: "Radix Themes",
    url: "https://www.radix-ui.com/themes",
    description: "Composants accessibles et stylables",
    category: "Dev · Librairies",
    tags: ["React", "UI"],
  },
  {
    title: "HeroUI",
    url: "https://heroui.com",
    description: "React UI Library moderne et rapide",
    category: "Dev · Librairies",
    tags: ["React", "UI"],
  },
  {
    title: "Motion",
    url: "https://motion.dev",
    description: "Exemples officiels d'animations React, JS & Vue",
    category: "Dev · Librairies",
    tags: ["Animation", "React"],
  },
  {
    title: "Geist",
    url: "https://vercel.com/geist",
    description: "Design system de Vercel",
    category: "Dev · Librairies",
    tags: ["Design System", "React"],
  },
  {
    title: "Carbon Design System",
    url: "https://carbondesignsystem.com",
    description: "Design system d'IBM",
    category: "Dev · Librairies",
    tags: ["Design System"],
  },
  {
    title: "Fluent 2",
    url: "https://fluent2.microsoft.design",
    description: "Design system de Microsoft",
    category: "Dev · Librairies",
    tags: ["Design System"],
  },
  {
    title: "Material Design",
    url: "https://material.io",
    description: "Design system de Google",
    category: "Dev · Librairies",
    tags: ["Design System"],
  },
  {
    title: "Apple HIG",
    url: "https://developer.apple.com/design/",
    description: "Human Interface Guidelines d'Apple",
    category: "Dev · Librairies",
    tags: ["Design System", "Mobile"],
  },
  {
    title: "USWDS",
    url: "https://designsystem.digital.gov",
    description: "Design system du gouvernement US",
    category: "Dev · Librairies",
    tags: ["Design System", "Accessibilité"],
  },
  {
    title: "Headless UI",
    url: "https://headlessui.com",
    description: "Composants accessibles unstyled",
    category: "Dev · Librairies",
    tags: ["React", "UI"],
  },
  {
    title: "Ant Design",
    url: "https://ant.design",
    description: "UI library enterprise avec theme editor",
    category: "Dev · Librairies",
    tags: ["React", "UI"],
  },
  {
    title: "visx",
    url: "https://airbnb.io/visx/",
    description: "Primitives de data visualization par Airbnb",
    category: "Dev · Librairies",
    tags: ["React", "Data Viz"],
  },
  {
    title: "UI8",
    url: "https://ui8.net",
    description: "UI kits, wireframes et ressources design",
    category: "Dev · Librairies",
    tags: ["UI", "Figma"],
  },
  {
    title: "goey-toast",
    url: "https://goey-toast.vercel.app",
    description: "Notifications toast morphing pour React",
    category: "Dev · Librairies",
    tags: ["Animation", "React"],
  },
  {
    title: "Tailwind Plus",
    url: "https://tailwindcss.com/plus",
    description: "Composants Tailwind CSS officiels",
    category: "Dev · Librairies",
    tags: ["CSS", "UI"],
  },
  {
    title: "Warp Background",
    url: "https://warp.dev",
    description: "Composants React avec backgrounds animés",
    category: "Dev · Librairies",
    tags: ["Animation", "React"],
  },
  {
    title: "Bootstrap",
    url: "https://getbootstrap.com",
    description: "Framework CSS le plus populaire",
    category: "Dev · Librairies",
    tags: ["CSS", "UI"],
  },
  {
    title: "Understrap",
    url: "https://understrap.com",
    description: "Starter theme WordPress + Bootstrap",
    category: "Dev · Librairies",
    tags: ["CSS", "UI"],
  },
  {
    title: "ui.land",
    url: "https://ui.land",
    description: "Composants et templates UI",
    category: "Dev · Librairies",
    tags: ["UI", "React"],
  },

  // ── Dev · Outils ──
  {
    title: "CodePen",
    url: "https://codepen.io",
    description: "Playground front-end en ligne",
    category: "Dev · Outils",
    tags: ["CSS", "JS"],
  },
  {
    title: "Can I Use",
    url: "https://caniuse.com",
    description: "Compatibilité navigateurs HTML5, CSS3",
    category: "Dev · Outils",
    tags: ["CSS", "Référence"],
  },
  {
    title: "LayoutIt! Grid",
    url: "https://grid.layoutit.com",
    description: "Générateur de CSS Grid visuel",
    category: "Dev · Outils",
    tags: ["CSS"],
  },
  {
    title: "Box Shadow Generator",
    url: "https://cssgenerator.org/box-shadow-css-generator.html",
    description: "Générateur de box-shadow CSS",
    category: "Dev · Outils",
    tags: ["CSS"],
  },
  {
    title: "CSS Minifier",
    url: "https://www.toptal.com/developers/cssminifier",
    description: "Minificateur et compresseur CSS",
    category: "Dev · Outils",
    tags: ["CSS", "Performance"],
  },
  {
    title: "GTmetrix",
    url: "https://gtmetrix.com",
    description: "Tests de performance web",
    category: "Dev · Outils",
    tags: ["Performance"],
  },
  {
    title: "PageSpeed Insights",
    url: "https://pagespeed.web.dev",
    description: "Analyse de performance par Google",
    category: "Dev · Outils",
    tags: ["Performance"],
  },
  {
    title: "Wayback Machine",
    url: "https://web.archive.org",
    description: "Archives du web",
    category: "Dev · Outils",
    tags: ["Référence"],
  },
  {
    title: "Snazzy Maps",
    url: "https://snazzymaps.com",
    description: "Styles gratuits pour Google Maps",
    category: "Dev · Outils",
    tags: ["UI"],
  },
  {
    title: "Placehold",
    url: "https://placehold.co",
    description: "Service d'images placeholder rapide",
    category: "Dev · Outils",
    tags: ["Mockup"],
  },
  {
    title: "Firecrawl",
    url: "https://www.firecrawl.dev",
    description: "API de données web pour l'AI",
    category: "Dev · Outils",
    tags: ["JS", "AI"],
  },
  {
    title: "Context7",
    url: "https://context7.com",
    description: "Documentation à jour pour librairies, intégrée aux assistants IA",
    category: "Dev · Outils",
    tags: ["AI", "Référence"],
  },
  {
    title: "Shader AI",
    url: "https://shaderai.com/new",
    description: "Générer des shaders avec l'AI",
    category: "Dev · Outils",
    tags: ["AI", "Animation"],
  },
  {
    title: "Speak Human",
    url: "https://speakhuman.today",
    description: "Générateur de copy lisible et humaine",
    category: "Dev · Outils",
    tags: ["UX", "Référence"],
  },

  // ── Chrome Extensions ──
  {
    title: "ColorZilla",
    url: "https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp",
    description: "Pipette couleur et générateur de gradients",
    category: "Chrome Extensions",
    tags: ["Couleur", "CSS"],
  },
  {
    title: "WhatFont",
    url: "https://chromewebstore.google.com/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm",
    description: "Identifier les polices sur n'importe quel site",
    category: "Chrome Extensions",
    tags: ["Typo"],
  },
  {
    title: "Wappalyzer",
    url: "https://chromewebstore.google.com/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg",
    description: "Détecter les technos utilisées par un site",
    category: "Chrome Extensions",
    tags: ["Référence"],
  },
  {
    title: "Web Developer",
    url: "https://chromewebstore.google.com/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm",
    description: "Boîte à outils front-end essentielle",
    category: "Chrome Extensions",
    tags: ["CSS", "JS"],
  },
  {
    title: "GreenIT Analysis",
    url: "https://chromewebstore.google.com/detail/greenit-analysis/mofbfhffeklkbebfclfaiifefjflcpad",
    description: "Analyse éco-conception et impact environnemental",
    category: "Chrome Extensions",
    tags: ["Performance", "Accessibilité"],
  },
  {
    title: "GoFullPage",
    url: "https://chromewebstore.google.com/detail/gofullpage/fdpohaocaechififmbbbbbknoalclacl",
    description: "Capture d'écran pleine page en un clic",
    category: "Chrome Extensions",
    tags: ["Mockup"],
  },
  {
    title: "PerfectPixel",
    url: "https://chromewebstore.google.com/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi",
    description: "Superposer une maquette sur le navigateur",
    category: "Chrome Extensions",
    tags: ["UI", "CSS"],
  },
  {
    title: "Page Ruler",
    url: "https://chromewebstore.google.com/detail/page-ruler/jcbmcnpknfamkpaookdenhepmighaiah",
    description: "Mesurer les dimensions d'éléments à l'écran",
    category: "Chrome Extensions",
    tags: ["UI", "CSS"],
  },
  {
    title: "Measures Dimension",
    url: "https://chromewebstore.google.com/detail/measures-dimension/jocakphhpfmjhkfjlaifbkfgcipmnigh",
    description: "Mesurer distances et espacements sur une page",
    category: "Chrome Extensions",
    tags: ["UI", "CSS"],
  },

  // ── Dev · Documentation ──
  {
    title: "Codecademy",
    url: "https://www.codecademy.com",
    description: "Apprendre à coder gratuitement",
    category: "Dev · Documentation",
    tags: ["Formation", "JS"],
  },
  {
    title: "Codrops",
    url: "https://tympanus.net/codrops/",
    description: "Ressources et inspiration front-end créatives",
    category: "Dev · Documentation",
    tags: ["CSS", "Animation", "Inspiration"],
  },
  {
    title: "SVG Path Commands",
    url: "https://css-tricks.com/svg-path-syntax-illustrated-guide/",
    description: "Deep dive dans les commandes SVG path",
    category: "Dev · Documentation",
    tags: ["CSS", "Animation"],
  },
  {
    title: "Animating CSS Grid",
    url: "https://css-tricks.com/animating-css-grid-how-to-examples/",
    description: "Animer les CSS Grid — exemples",
    category: "Dev · Documentation",
    tags: ["CSS", "Animation"],
  },
  {
    title: "Codewars",
    url: "https://www.codewars.com",
    description: "Katas de code pour progresser",
    category: "Dev · Documentation",
    tags: ["JS", "Exercice"],
  },
  {
    title: "Agent Skills",
    url: "https://docs.anthropic.com",
    description: "Overview — Claude Agent Skills",
    category: "Dev · Documentation",
    tags: ["AI", "Référence"],
  },
  {
    title: "Apple Sheets",
    url: "https://developer.apple.com/documentation/swiftui/sheet",
    description: "Documentation SwiftUI Sheets",
    category: "Dev · Documentation",
    tags: ["Mobile"],
  },
  {
    title: "Markdown Badges",
    url: "https://github.com/Ileriayo/markdown-badges",
    description: "Badges pour profils et projets GitHub",
    category: "Dev · Documentation",
    tags: ["Référence"],
  },
  {
    title: "Figma Design System",
    url: "https://www.youtube.com/watch?v=EK-pHkc5EL4",
    description: "Build it in Figma — Components (YouTube)",
    category: "Dev · Documentation",
    tags: ["Figma", "Design System", "Formation"],
  },
  {
    title: "SVG Paths (Nan)",
    url: "https://www.nan.fyi/svg-paths",
    description: "Cours interactif sur les SVG paths par Nan Yu",
    category: "Dev · Documentation",
    tags: ["CSS", "Animation", "Formation"],
  },
  {
    title: "animationsdev-hero",
    url: "https://github.com/dimicx/animationsdev-hero",
    description: "Repo open-source du hero animations.dev par dimi",
    category: "Dev · Documentation",
    tags: ["Animation", "React"],
  },
  {
    title: "Sidebar Animation Perf",
    url: "https://www.joshuawootonn.com/sidebar-animation-performance",
    description: "Deep dive performance des animations de sidebar",
    category: "Dev · Documentation",
    tags: ["Animation", "Performance", "React"],
  },
  {
    title: "Steal Like an Artist",
    url: "https://www.amazon.com.be/gp/product/0761169253/",
    description: "Austin Kleon — livre sur la créativité et l'inspiration",
    category: "Dev · Documentation",
    tags: ["Formation", "Inspiration"],
  },
  {
    title: "Show Your Work!",
    url: "https://www.amazon.com.be/gp/product/076117897X/",
    description: "Austin Kleon — partager son travail créatif",
    category: "Dev · Documentation",
    tags: ["Formation", "Inspiration"],
  },
  {
    title: "SuperHi",
    url: "https://www.superhi.com",
    description: "Learn To Code Now — HTML, CSS & JS",
    category: "Dev · Documentation",
    tags: ["Formation", "JS", "CSS"],
  },
  {
    title: "SoloLearn",
    url: "https://www.sololearn.com",
    description: "Apprendre à coder sur mobile et web",
    category: "Dev · Documentation",
    tags: ["Formation", "JS"],
  },
  {
    title: "Tailwind + Svelte + Vite",
    url: "https://dev.to/onlyphp/comment-installer-tailwind-css-avec-svelte-vite-4d2e",
    description: "Installer Tailwind CSS avec Svelte + Vite",
    category: "Dev · Documentation",
    tags: ["CSS", "JS"],
  },

  // ── X · À suivre ──
  {
    title: "rauno",
    url: "https://x.com/raunofreiberg",
    description: "Staff Design Engineer chez Vercel — devouringdetails.com",
    category: "X · À suivre",
    tags: ["UI", "Animation"],
  },
  {
    title: "Gavin Nelson",
    url: "https://x.com/Gavmn",
    description: "Interaction designer chez OpenAI",
    category: "X · À suivre",
    tags: ["UI", "Animation"],
  },
  {
    title: "Rasmus Andersson",
    url: "https://x.com/rsms",
    description: "Designer de Inter, ex-Figma & Spotify",
    category: "X · À suivre",
    tags: ["Typo", "UI"],
  },
  {
    title: "benjamin",
    url: "https://x.com/benjaminnathan",
    description: "Head of Product chez Framer",
    category: "X · À suivre",
    tags: ["UI", "SaaS"],
  },
  {
    title: "Julian Lehr",
    url: "https://x.com/julianlehr",
    description: "Creative Director chez Linear",
    category: "X · À suivre",
    tags: ["UI", "Branding"],
  },
  {
    title: "Nan Yu",
    url: "https://x.com/thenanyu",
    description: "Head of Product chez Linear",
    category: "X · À suivre",
    tags: ["UX", "SaaS"],
  },
  {
    title: "Dhruvin",
    url: "https://x.com/writenicecode",
    description: "Design · Code · Bugs",
    category: "X · À suivre",
    tags: ["UI", "Animation"],
  },
  {
    title: "dimi",
    url: "https://x.com/dimicx",
    description: "Design engineer — griffo.dimi.me",
    category: "X · À suivre",
    tags: ["UI", "Typo"],
  },
  {
    title: "⁂ (desengs)",
    url: "https://x.com/remvze",
    description: "Design Engineer — desengs.com, noiced.com, ogpedia.com",
    category: "X · À suivre",
    tags: ["UI", "Inspiration"],
  },
  {
    title: "Alfredo Natal",
    url: "https://x.com/_itsanl",
    description: "Créateur de goey-toast — vet, dev depuis 16 ans",
    category: "X · À suivre",
    tags: ["React", "Animation"],
  },
  {
    title: "Ali Bey",
    url: "https://x.com/alibey_10",
    description: "Créateur de shoogle.dev, formcn.dev, cardcn.dev",
    category: "X · À suivre",
    tags: ["React", "UI"],
  },
  {
    title: "Adam Whitcroft",
    url: "https://x.com/AdamWhitcroft",
    description: "Design chez Owner — maker of small apps",
    category: "X · À suivre",
    tags: ["UI", "Branding"],
  },
  {
    title: "Miles (mlaithv)",
    url: "https://x.com/mlaithv",
    description: "Créateur d'Andante Practice et Miles Running",
    category: "X · À suivre",
    tags: ["Mobile", "UI"],
  },
  {
    title: "Justin Schueler",
    url: "https://x.com/justin_schueler",
    description: "Designer & Founder chez Small Tribe",
    category: "X · À suivre",
    tags: ["UI", "Branding"],
  },
  {
    title: "Maddie Simens",
    url: "https://x.com/maddiesimens",
    description: "Human in the loop chez OpenAI",
    category: "X · À suivre",
    tags: ["AI", "UX"],
  },
];

const ALL_TAGS = [...new Set(bookmarks.flatMap((b) => b.tags))].sort();

const CATEGORY_COLORS: Record<string, string> = {
  IA: "cyan",
  "Design · Outils": "coral",
  "Design · Assets": "amber",
  Inspiration: "emerald",
  "UX · Documentation": "sky",
  "Dev · Librairies": "violet",
  "Dev · Outils": "pink",
  "Dev · Documentation": "teal",
  "Chrome Extensions": "orange",
  "X · À suivre": "indigo",
};

const FilterPill = ({
  tag,
  isActive,
  onToggle,
}: {
  tag: string;
  isActive: boolean;
  onToggle: () => void;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    if (btnRef.current && isActive) {
      setSize({
        w: btnRef.current.offsetWidth,
        h: btnRef.current.offsetHeight,
      });
    }
  }, [isActive]);

  return (
    <span className="bk-pill-wrapper">
      <button
        ref={btnRef}
        className={`bk-pill${isActive ? " active" : ""}`}
        onClick={onToggle}
        aria-pressed={isActive}
      >
        {tag}
      </button>
      {isActive && size.w > 0 && (
        <HandCircle width={size.w} height={size.h} />
      )}
    </span>
  );
};

const Bookmarks = () => {
  useSEO({
    title: "Bookmarks — Chloé Halloin",
    description:
      "Ma collection de ressources design & dev — outils, inspiration, librairies et extensions.",
  });

  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filtered =
    activeTags.length === 0
      ? bookmarks
      : bookmarks.filter((b) => activeTags.some((t) => b.tags.includes(t)));

  const categories = [...new Set(filtered.map((b) => b.category))];

  return (
    <>
      <section className="bookmarks-section" aria-label="Liens favoris">
        <h2 className="section-title">Bookmarks</h2>
        <p className="section-intro">
          Mes liens préférés, les outils et ressources que j'utilise au
          quotidien.
        </p>

        <div className="bk-filters" role="group" aria-label="Filtrer par tag">
          {ALL_TAGS.map((tag) => (
            <FilterPill
              key={tag}
              tag={tag}
              isActive={activeTags.includes(tag)}
              onToggle={() => toggleTag(tag)}
            />
          ))}
          {activeTags.length > 0 && (
            <button
              className="bk-pill bk-pill-clear"
              onClick={() => setActiveTags([])}
            >
              Clear
            </button>
          )}
        </div>

        {categories.map((category) => (
          <div
            key={category}
            className="bk-category"
            data-color={CATEGORY_COLORS[category] || "coral"}
          >
            <h3 className="bk-category-title">{category}</h3>
            <ul className="bk-list">
              {filtered
                .filter((b) => b.category === category)
                .map((bookmark) => (
                  <li key={bookmark.url} className="bk-item">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bk-link"
                    >
                      <span className="bk-name">{bookmark.title}</span>
                      <ExternalLink
                        size={12}
                        aria-hidden="true"
                        className="bk-arrow"
                      />
                    </a>
                    <span className="bk-desc">{bookmark.description}</span>
                    <span className="bk-tags">
                      {bookmark.tags.map((tag) => (
                        <span key={tag} className="bk-tag">
                          {tag}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
};

export default Bookmarks;
