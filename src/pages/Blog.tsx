import { useState } from "react";
import TypoReveal from "../components/TypoReveal";
import {
  Laptop,
  Smartphone,
  NotebookPen,
  BookOpen,
  BookMarked,
  TabletSmartphone,
  Headphones,
  Bluetooth,
  PocketKnife,
  Flame,
  GlassWater,
  Wallet,
  Wrench,
  Cross,
  Clover,
  Scissors,
  ArrowLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSEO } from "../hooks/useSEO";

interface BagItem {
  name: string;
  detail: string;
  icon: LucideIcon;
}

interface BagCategory {
  name: string;
  items: BagItem[];
}

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: () => JSX.Element;
}

const BAG_CATEGORIES: BagCategory[] = [
  {
    name: "Toujours sur moi",
    items: [
      {
        name: "MacBook Air M1",
        detail:
          "Ami fidèle qu'il faudra changer un jour — mais pas tant qu'il est en vie",
        icon: Laptop,
      },
      {
        name: "iPhone 13 Mini",
        detail: "Le dernier à avoir eu droit à une version mini. RIP",
        icon: Smartphone,
      },
      {
        name: "Leuchtturm1917",
        detail:
          "Mon cerveau externalisé — mélange de briefs, d'éclairs de génie et de choses que j'aurais pu juste mettre dans Notion",
        icon: NotebookPen,
      },
      {
        name: "Carnet de lectures",
        detail:
          "Né d'une bonne résolution et d'une envie de romancer ma vie devant un café le dimanche matin",
        icon: BookOpen,
      },
      {
        name: "Un livre",
        detail:
          'J\'adore être "la fille qui a toujours un livre sur elle" — en ce moment : Le Maître du Haut Château (màj avril 2025)',
        icon: BookMarked,
      },
      {
        name: "Kobo Clara B&W",
        detail:
          "Pour 2 minutes on ne sort pas une brique, mais la liseuse est toujours accessible",
        icon: TabletSmartphone,
      },
      {
        name: "Écouteurs filaires",
        detail: "Mon quota de nostalgie",
        icon: Headphones,
      },
      {
        name: "AirPods",
        detail: "Le son est objectivement meilleur, j'ai capitulé",
        icon: Bluetooth,
      },
    ],
  },
  {
    name: "Le fond du sac",
    items: [
      {
        name: "Canif",
        detail:
          "J'adore être la personne qui dit \"bien sûr j'ai ça dans mon sac\"",
        icon: PocketKnife,
      },
      {
        name: "Briquet",
        detail:
          "Même sans être fumeuse, ça sert toujours — et au pire ça aide les potes",
        icon: Flame,
      },
      {
        name: "Gourde",
        detail: "Ma résolution qui tient le plus longtemps",
        icon: GlassWater,
      },
      {
        name: "Portefeuille",
        detail:
          "Collectionne les tickets inutiles mais perd bizarrement les garanties",
        icon: Wallet,
      },
      {
        name: "Clef de vélo",
        detail: "À vélo, Bruxelles tient dans une poche",
        icon: Wrench,
      },
      { name: "Sparadrap", detail: "Ça peut toujours aider", icon: Cross },
      {
        name: "Porte-bonheur",
        detail:
          "Un objet dont je n'ai pas trouvé d'utilité, donc je lui ai attribué ce rôle",
        icon: Clover,
      },
      {
        name: "Échantillons de tissus",
        detail:
          "Pour acheter le fil de la bonne couleur, parce que la couleur sur écran ment toujours",
        icon: Scissors,
      },
    ],
  },
];

const BagArticleContent = () => (
  <div className="blog-article-body">
    <p className="blog-article-intro">
      Le contenu réel de mon sac, à tout moment.
    </p>
    <div className="bag-grid">
      {BAG_CATEGORIES.map((category) => (
        <div key={category.name} className="bag-category">
          <h3 className="bag-category-title">{category.name}</h3>
          <ul className="bag-list">
            {category.items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="bag-item">
                  <Icon size={15} aria-hidden="true" className="bag-icon" />
                  <div className="bag-info">
                    <span className="bag-name">{item.name}</span>
                    <span className="bag-detail">{item.detail}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const LearningArticleContent = () => (
  <div className="blog-article-body">
    <p className="blog-article-intro">
      Je savais que je répétais des erreurs mais je n'arrivais pas à les
      identifier.
    </p>

    <p>
      C'est ça le vrai problème — pas juste de faire des erreurs, mais de ne pas
      avoir les repères techniques pour les reconnaître. Je suis designer avant
      d'être développeuse. Je code mes designs, je sais ce que je veux produire
      visuellement, mais la discipline d'ingénierie derrière, comment structurer
      une PR, quand extraire un composant, comment délimiter le scope sans
      couper dans le vif, ça, personne ne me l'avait vraiment appris. Et itérer
      en tâtonnant sur sa propre façon de coder, c'est lent. Très lent.
    </p>

    <h3>Le vrai coût des PR qui débordent</h3>
    <p>
      Mes PRs avaient un pattern récurrent que je ne voyais pas sur le moment :
      elles commençaient sur un composant ciblé et finissaient par toucher cinq
      fichiers non liés et une multitude d'éléments hardcodés. Résultat : des
      reviews plus longues, des conflits de merge, et surtout une perte de
      confiance dans ma propre capacité à livrer quelque chose de propre. Le
      problème n'était pas l'intention. C'était l'absence de méthode pour tenir
      le scope.
    </p>
    <p>
      Ce que je cherchais, ce n'était pas un cours. C'était une façon d'intégrer
      rapidement une méthodologie durable, quelque chose qui se glisse dans mon
      workflow sans friction plutôt qu'un apprentissage parallèle qui prend du
      temps sur le travail réel.
    </p>

    <h3>
      L'idée derrière <code>claude-brain</code>
    </h3>
    <p>
      J'ai la chance d'avoir dans mon équipe un designer plus expérimenté que
      moi, dont je voyais clairement la différence de niveau dans les PR. Au
      départ, je voulais les analyser moi-même pour comprendre ses décisions.
      Sauf que c'est là que j'ai buté : je n'avais pas encore les bases
      techniques pour lire une PR complexe et en extraire ce qui comptait. Je
      voyais que c'était bien fait, je ne savais pas toujours pourquoi.
    </p>
    <p>
      Et même quand je comprenais à peu près ce que je lisais, analyser une PR
      convenablement demandait un temps monstre : croiser les fichiers modifiés,
      reconstituer le raisonnement derrière chaque choix, distinguer ce qui est
      convention de ce qui est décision délibérée. Ce n'était pas tenable en
      parallèle d'un vrai travail.
    </p>
    <p>
      C'est de cette impasse qu'est venue l'idée d'externaliser l'analyse. J'ai
      créé
      <code>claude-brain</code>, un repo GitHub privé qui accumule les patterns
      extraits de ces PRs dans un fichier <code>mentor-knowledge.md</code>. À
      chaque analyse via <code>/learn-pr</code>, la base grandit : comment il
      découpe un problème, ses choix de typage TypeScript, ce qu'il encapsule
      versus ce qu'il expose, ses arbitrages entre flexibilité et simplicité.
    </p>
    <p>
      Ce qui m'importe dans la conception du système, c'est ce qu'il n'extrait
      <em>pas</em> : tout ce qui est déjà documenté dans les règles du projet.
      L'objectif est de capturer le savoir tacite, les décisions prises sans les
      expliquer parce qu'elles sont devenues instinctives, et qui sont
      exactement ce qui me manque.
    </p>

    <h3>
      <code>/mentor-me</code>: réinjecter au bon moment
    </h3>
    <p>
      Accumuler des patterns ne change rien si on ne les utilise pas au moment
      où ça compte. Avant d'attaquer une tâche, je décris ce que je veux faire
      avec
      <code>/mentor-me</code>. Claude filtre la knowledge base, garde uniquement
      ce qui est pertinent pour <em>ce</em> type de tâche, et produit un prompt
      enrichi : l'approche à adopter, les décisions à prendre en amont, les
      anti-patterns à éviter.
    </p>
    <p>
      En pratique, ça change la façon dont j'entre dans le code. J'arrive avec
      un cadre plutôt qu'avec une vague intention. Les PR restent dans leur
      scope, les décisions structurantes sont prises avant de toucher au code,
      et je passe moins de temps à me demander si mon approche est raisonnable,
      parce que j'ai déjà une réponse.
    </p>

    <h3>Ce que ça a changé concrètement</h3>
    <p>
      La différence que je ressens, c'est moins dans la qualité du code produit
      que dans la qualité de la réflexion <em>avant</em> de coder. J'ai arrêté
      de découvrir les problèmes de scope en milieu de PR. Je commence à
      reconnaître les patterns que je cherchais avant à tâtons — et parfois je
      les reconnais assez tôt pour changer de direction sans avoir à tout
      défaire.
    </p>
    <p>
      Ce qui est important à préciser : le système ne fait pas juste appliquer
      des règles à ma place. La commande m'explique les démarches et les erreurs
      à éviter, avec le raisonnement derrière. C'est cette partie qui m'importe
      — parce que ça veut dire qu'in fine, j'emmagasine quand même les
      compétences. Je ne délègue pas mon apprentissage, je l'accélère.
    </p>
    <p>
      Est-ce que j'aurais appris ces choses de toute façon, avec du temps ?
      Probablement. Mais le temps est cher quand on est en poste et qu'on veut
      livrer quelque chose de solide maintenant, pas dans six mois. Ce système
      m'a permis de comprimer cette courbe d'apprentissage sans sacrifier la
      qualité du travail en cours.
    </p>
  </div>
);

const POSTS: BlogPost[] = [
  {
    slug: "claude-brain",
    title: "Répéter les mêmes erreurs sans le savoir — et comment j'ai arrêté",
    date: "2025-05-13",
    excerpt:
      "Rétrospective sur claude-brain — comment j'ai construit un système pour intégrer une méthodologie de code durable, sans sacrifier le travail en cours.",
    content: LearningArticleContent,
  },
  {
    slug: "whats-in-my-bag",
    title: "What's in my bag",
    date: "2025-03-01",
    excerpt: "Les objets de mon quotidien — tech, accessoires et essentiels.",
    content: BagArticleContent,
  },
];

const Blog = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activePost = POSTS.find((p) => p.slug === activeSlug);

  useSEO({
    title: activePost
      ? `${activePost.title} — Blog — Chloé Halloin`
      : "Blog — Chloé Halloin",
    description: activePost
      ? activePost.excerpt
      : "Articles, réflexions et partages.",
  });

  if (activePost) {
    const Content = activePost.content;
    return (
      <TypoReveal>
        <section className="blog-section" aria-label={activePost.title}>
          <button
            className="blog-back"
            onClick={() => setActiveSlug(null)}
            aria-label="Retour au blog"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Blog</span>
          </button>
          <article className="blog-article">
            <header className="blog-article-header">
              <time className="blog-article-date" dateTime={activePost.date}>
                {new Date(activePost.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="blog-article-title">{activePost.title}</h2>
            </header>
            <Content />
          </article>
        </section>
      </TypoReveal>
    );
  }

  return (
    <TypoReveal>
      <section className="blog-section" aria-label="Blog">
        <h2 className="section-title">Blog</h2>
        <p className="section-intro">Articles, réflexions et partages.</p>
        <ul className="blog-post-list">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <button
                className="blog-post-card"
                onClick={() => setActiveSlug(post.slug)}
              >
                <time className="blog-post-date" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-post-excerpt">{post.excerpt}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </TypoReveal>
  );
};

export default Blog;
