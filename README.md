# Portfolio — Chloe Halloin

Product Designer & Design Engineer. Je concois des produits et je les code.

**[chlohal.com](https://chlohal.com)**

---

## Le concept

Ce portfolio n'est pas juste une vitrine — c'est une demo vivante de mon adaptabilite sectorielle.

Le site propose **11 themes visuels** correspondant chacun a un secteur d'activite pour lequel j'ai travaille. Chaque theme applique sa propre palette de couleurs, ses typographies et son ambiance, tout en conservant la meme structure de contenu. L'idee : montrer que je sais m'approprier les codes graphiques de n'importe quelle industrie.

En mode par defaut, le site reste volontairement brut et minimal — un rendu markdown-like avec Inter et JetBrains Mono. Des qu'un secteur est selectionne, l'interface se transforme : cartes, bordures accent, pills, typographies sectorielles.

### Les secteurs

| Secteur | Typos | Ambiance |
|---------|-------|----------|
| Fleurs | Cormorant / Figtree | Peche chaud, brun elegant |
| Vin | Archivo Narrow / Poppins | Blanc pur, rouge vif |
| Boxe | Fjalla One / Nunito Sans | Noir profond, violet electrique |
| Real Estate | Montserrat / Poppins | Creme dore, tons chauds |
| Agence Media | Electrolize / Kanit | Gris sombre, rouge brique |
| Agence Digitale | Rubik / Zilla Slab | Beige clair, bleu vif |
| Artiste | Host Grotesk | Noir et blanc, monochrome |
| Production | Arial | Blanc, vert fluo |
| Doudou | Cormorant / Raleway | Peche doux, brun chaleureux |
| Bijoux | Playfair Display | Creme vert, noir luxe |
| Leisure | Inter | Bleu gaming |

## Pages

- **Moi** (`/`) — layout editorial avec fond topographique anime (lignes de contour en mauve, marching squares). Hero, competences, qualites, outils interactifs et grille bento de widgets.
- **Experience** (`/experience`) — parcours professionnel detaille
- **Bookmarks** (`/bookmarks`) — liens favoris organises par categorie (IA, Design, Inspiration, UX, Dev, Chrome Extensions, X) avec filtrage par tags
- **Laboratoire** (`/laboratoire`) — experiences interactives presentees dans une grille d'icones style Finder avec Quick Look au hover et code source copiable (Variable Font Animator, Dynamic Island, Theme Transition, Chat Split-Flap, Morph Checkbox, Scrubber Input, Hold to Delete, Daily UI #001 Sign Up, Daily UI #002 Checkout)
- **Blog** (`/blog`)

## Fonctionnalites

- **Theming sectoriel dynamique** — changement de palette, typos et ambiance via le dropdown dans la nav
- **Dark mode** — toggle clair/sombre avec crossfade anime et persistence localStorage
- **Fond topographique** — canvas anime en temps reel (marching squares, ~30 fps) avec lignes de contour et caracteres positionnels
- **Bento grid** — grille de widgets responsive : photo, carte, heure, statut, hero, liens, competences, qualites, experience, formation, dark mode, theme sectoriel
- **Outils interactifs** — generateur de nom ninja, generateur de mot de passe, egg timer, book picker, jauge a cafe
- **Bookmarks** — 150+ liens classes par categorie avec filtrage par tags
- **Laboratoire** — 9 experiences interactives avec Quick Look au hover, navigation par dossier et code source copiable
- **Contenu data-driven** — tout le texte vient d'un fichier de donnees
- **SPA routing** — navigation client-side avec `.htaccess` pour Hostinger (Apache)

## Stack technique

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + CSS custom properties (`--p-*`) |
| Composants UI | shadcn/ui + Radix |
| Icones | lucide-react |
| Fonts | Google Fonts (15 familles chargees a la demande) |
| Hebergement | Hostinger |

## Structure

```
src/
  components/
    TopographicBackground.tsx  — canvas anime marching squares
    SectorNavigation.tsx       — dropdown de selection de secteur
    DarkModeToggle.tsx         — toggle clair/sombre avec crossfade
    DockNavigation.tsx         — navigation dock en bas (mobile)
    InteractiveTools.tsx       — outils bonus (ninja, password, timer, book, coffee)
    CodePreview.tsx            — carte apercu + code pour le labo
    Layout.tsx                 — layout avec Outlet pour le routing
    bento/
      BentoGrid.tsx            — grille responsive de widgets
      BentoWidget.tsx          — conteneur generique de widget
      widgets/
        HeroWidget.tsx
        PhotoWidget.tsx
        MapWidget.tsx
        TimeWidget.tsx
        StatusWidget.tsx
        SkillsWidget.tsx
        QualitiesWidget.tsx
        ExperienceWidget.tsx
        EducationWidget.tsx
        LinksWidget.tsx
        DarkModeWidget.tsx
        SectorThemeWidget.tsx
        SectorsWidget.tsx
  pages/
    Moi.tsx                    — page principale (hero, bento, fond topo)
    Experience.tsx             — parcours professionnel
    Bookmarks.tsx              — liens favoris avec filtrage par tags
    Laboratoire.tsx            — experiences d'animation interactives
    Blog.tsx
  data/
    portfolio.ts               — types + donnees par defaut
    usePortfolioData.ts        — hook avec localStorage + JSON export
  styles/
    adaptive-portfolio.css     — palettes sectorielles, themes, animations
    bento-grid.css             — layout et styles de la grille bento
    moi.css                    — layout editorial de la page Moi
```

## Lancer en local

```bash
npm install
npm run dev
```

## Contact

- **Email** — halloinchloe@gmail.com
- **LinkedIn** — [linkedin.com/in/chloe-halloin](https://www.linkedin.com/in/chlo%C3%A9-halloin/)
- **GitHub** — [github.com/ChloeHal](https://github.com/ChloeHal)
- **X** — [x.com/chlohal](https://x.com/chlohal)
