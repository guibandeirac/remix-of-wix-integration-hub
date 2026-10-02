import { createFileRoute, Link } from "@tanstack/react-router";

import { IsotipoOutline } from "@/components/brand-graphics";
import { P } from "@/components/text";
import { formatArticleDate } from "@/lib/format";
import { listArticles, type ArticleCategory, type ArticleSummary } from "@/lib/wix";

export const Route = createFileRoute("/artigos/")({
  // ?tema=lideranca filtra o arquivo por categoria
  validateSearch: (search: Record<string, unknown>): { tema?: string } =>
    typeof search["tema"] === "string" ? { tema: search["tema"] } : {},
  loader: () => listArticles(),
  head: () => ({
    meta: [
      { title: "Artigos — Zum Educação" },
      {
        name: "description",
        content:
          "Reflexões da Zum sobre aprendizagem corporativa, comportamento, neurociência e desenvolvimento de pessoas.",
      },
      { property: "og:title", content: "Artigos — Zum Educação" },
      {
        property: "og:description",
        content: "Aprendizagem corporativa, comportamento e desenvolvimento de pessoas.",
      },
    ],
  }),
  component: Artigos,
});

const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Grade editorial de 6 colunas: linhas de 3 cartões, alternadas com linhas de 2
 * cartões largos quando a conta não fecha, para nunca sobrar um cartão sozinho.
 */
function gridSpan(index: number, total: number) {
  const rows: number[] = [];
  let rest = total;
  if (total % 3 === 1 && total >= 4) {
    rows.push(2);
    rest -= 2;
  }
  while (rest > 0) {
    const take = rest === 4 ? 2 : Math.min(3, rest);
    rows.push(take);
    rest -= take;
  }
  let seen = 0;
  for (const size of rows) {
    if (index < seen + size) {
      const lg = size === 3 ? "lg:col-span-2" : size === 2 ? "lg:col-span-3" : "lg:col-span-6";
      // no tablet (2 colunas), o último cartão de uma lista ímpar ocupa a linha toda
      const sm = total % 2 === 1 && index === total - 1 ? "sm:col-span-2" : "";
      return `${lg} ${sm}`.trim();
    }
    seen += size;
  }
  return "lg:col-span-2";
}

/** Temas presentes nos artigos, do mais frequente ao menos frequente. */
function themesOf(articles: ArticleSummary[]) {
  const map = new Map<string, { category: ArticleCategory; count: number }>();
  for (const a of articles) {
    if (!a.category) continue;
    const entry = map.get(a.category.slug) ?? { category: a.category, count: 0 };
    entry.count += 1;
    map.set(a.category.slug, entry);
  }
  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.category.label.localeCompare(b.category.label),
  );
}

function Artigos() {
  const articles = Route.useLoaderData();
  const { tema } = Route.useSearch();
  const themes = themesOf(articles);
  const active = themes.find((t) => t.category.slug === tema)?.category;

  const [latest, ...rest] = articles;
  const essentials = articles.filter((a) => a.featured && a.id !== latest?.id).slice(0, 3);
  const archive = active ? articles.filter((a) => a.category?.slug === active.slug) : rest;

  return (
    <>
      <section className="grain relative isolate overflow-hidden">
        <IsotipoOutline className="absolute top-[-35%] right-[-15%] -z-10 w-[min(900px,110vw)] opacity-80" />
        <div className="shell pt-20 pb-16 md:pt-28 md:pb-20">
          <P className="eyebrow rise">Artigos</P>
          <h1 className="display-xl rise rise-delay-1 mt-6 max-w-3xl">
            Ideias para transformar conhecimento em <em>comportamento.</em>
          </h1>
          {articles.length > 0 && (
            <P className="lead rise rise-delay-2 mt-7 max-w-2xl">
              {articles.length} {articles.length === 1 ? "artigo" : "artigos"} sobre liderança,
              aprendizagem nas organizações e o futuro do trabalho, com base em ciência e na
              prática.
            </P>
          )}
        </div>
      </section>

      {articles.length === 0 ? (
        <section className="hairline section">
          <div className="shell">
            <P className="lead">Nenhum artigo publicado ainda. Volte em breve.</P>
          </div>
        </section>
      ) : (
        <>
          {!active && latest && (
            <section className="hairline section" aria-labelledby="mais-recente">
              <div className="shell">
                <h2 id="mais-recente" className="eyebrow">
                  Mais recente
                </h2>
                <LeadStory article={latest} />
              </div>
            </section>
          )}

          {!active && essentials.length > 0 && (
            <section className="section-light section" aria-labelledby="essenciais">
              <div className="shell">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <P className="eyebrow">Comece por aqui</P>
                    <h2 id="essenciais" className="display-lg mt-5">
                      Três leituras <em>essenciais</em>
                    </h2>
                  </div>
                  <P className="copy max-w-sm">
                    Os textos que melhor resumem como a ZUM pensa aprendizagem, cultura e resultado.
                  </P>
                </div>
                <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
                  {essentials.map((article, i) => (
                    <li key={article.id}>
                      <ArticleCard article={article} index={i} />
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          <section
            id="arquivo"
            className="section hairline scroll-mt-20"
            aria-labelledby="arquivo-titulo"
          >
            <div className="shell">
              <div>
                <div>
                  <P className="eyebrow">{active ? "Tema" : "Arquivo"}</P>
                  <h2 id="arquivo-titulo" className="display-lg mt-5">
                    {active ? (
                      <em>{active.label}</em>
                    ) : (
                      <>
                        Todos os <em>artigos</em>
                      </>
                    )}
                  </h2>
                  {active?.description && (
                    <P className="copy mt-5 max-w-xl">{active.description}</P>
                  )}
                </div>
                {themes.length > 0 && (
                  <div className="mt-9">
                    <ThemeFilter themes={themes} active={active?.slug} />
                  </div>
                )}
              </div>

              <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-6">
                {archive.map((article, i) => (
                  <li key={article.id} className={gridSpan(i, archive.length)}>
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </>
  );
}

function ThemeFilter({
  themes,
  active,
}: {
  themes: ReturnType<typeof themesOf>;
  active: string | undefined;
}) {
  const total = themes.reduce((sum, t) => sum + t.count, 0);
  return (
    <nav aria-label="Filtrar por tema" className="-mx-1 flex flex-wrap gap-2">
      <Link
        to="/artigos"
        hash="arquivo"
        resetScroll={false}
        className="theme-chip"
        aria-current={active ? undefined : "page"}
      >
        Todos <span>{total}</span>
      </Link>
      {themes.map(({ category, count }) => (
        <Link
          key={category.slug}
          to="/artigos"
          search={{ tema: category.slug }}
          hash="arquivo"
          resetScroll={false}
          className="theme-chip"
          aria-current={active === category.slug ? "page" : undefined}
        >
          {category.label} <span>{count}</span>
        </Link>
      ))}
    </nav>
  );
}

function Meta({ article, long = false }: { article: ArticleSummary; long?: boolean }) {
  return (
    <p className="meta flex flex-wrap items-center gap-x-3 gap-y-1">
      {article.category && <span className="text-primary">{article.category.label}</span>}
      <span>{formatArticleDate(article.publishedAt)}</span>
      {article.minutesToRead > 0 && (
        <span>
          {article.minutesToRead} min{long ? " de leitura" : ""}
        </span>
      )}
    </p>
  );
}

function LeadStory({ article }: { article: ArticleSummary }) {
  return (
    <Link
      to="/artigos/$slug"
      params={{ slug: article.slug }}
      className="group mt-8 grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-14"
    >
      {article.coverUrl && (
        <div className="overflow-hidden rounded-3xl border border-border">
          <img
            src={article.coverUrl}
            alt=""
            width={1200}
            height={800}
            className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div>
        <Meta article={article} long />
        <h3 className="mt-5 text-3xl leading-tight font-medium tracking-tight transition-colors group-hover:text-primary md:text-4xl">
          {article.title}
        </h3>
        <P className="lead mt-6 line-clamp-4">{article.excerpt}</P>
        <span className="section-cta mt-9">
          Ler artigo
          <span className="section-cta-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function ArticleCard({ article, index }: { article: ArticleSummary; index?: number }) {
  return (
    <Link
      to="/artigos/$slug"
      params={{ slug: article.slug }}
      className="article-card group flex h-full flex-col"
    >
      {article.coverUrl && (
        <div className="relative overflow-hidden rounded-2xl border border-border">
          <img
            src={article.coverUrl}
            alt=""
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex items-baseline gap-3">
          {index !== undefined && <span className="num text-xl">[{pad(index)}]</span>}
          <Meta article={article} />
        </div>
        <h3 className="mt-4 text-xl leading-snug font-medium tracking-tight transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <P className="copy-sm mt-3 line-clamp-3">{article.excerpt}</P>
      </div>
    </Link>
  );
}
