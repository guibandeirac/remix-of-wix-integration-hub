import { createFileRoute, Link } from "@tanstack/react-router";

import { IsotipoOutline } from "@/components/brand-graphics";
import { formatArticleDate } from "@/lib/format";
import { listArticles, type ArticleSummary } from "@/lib/wix";
import { P } from "@/components/text";

export const Route = createFileRoute("/artigos/")({
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

function Artigos() {
  const articles = Route.useLoaderData();
  const [featured, ...rest] = articles;

  return (
    <>
      <section className="grain relative isolate overflow-hidden">
        <IsotipoOutline className="absolute top-[-35%] right-[-15%] -z-10 w-[min(900px,110vw)] opacity-80" />
        <div className="shell pt-20 pb-20 md:pt-28">
          <div>
            <P className="eyebrow rise">Artigos</P>
            <h1 className="display-xl rise rise-delay-1 mt-6 max-w-3xl">
              Ideias para transformar conhecimento em <em>comportamento.</em>
            </h1>
          </div>
        </div>
      </section>

      <section className="hairline section">
        <div className="shell">
          {!featured ? (
            <P className="lead">Nenhum artigo publicado ainda. Volte em breve.</P>
          ) : (
            <>
              <FeaturedCard article={featured} />
              {rest.length > 0 && (
                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function Meta({ article }: { article: ArticleSummary }) {
  return (
    <P className="meta">
      {formatArticleDate(article.publishedAt)}
      {article.minutesToRead > 0 && ` · ${article.minutesToRead} min de leitura`}
    </P>
  );
}

function FeaturedCard({ article }: { article: ArticleSummary }) {
  return (
    <Link
      to="/artigos/$slug"
      params={{ slug: article.slug }}
      className="group grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14"
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
        <Meta article={article} />
        <h2 className="mt-5 text-3xl leading-tight transition-colors group-hover:text-primary md:text-4xl">
          {article.title}
        </h2>
        <P className="lead mt-6 line-clamp-4">{article.excerpt}</P>
        <span className="link-underline mt-8 inline-block">Ler artigo</span>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <Link to="/artigos/$slug" params={{ slug: article.slug }} className="panel group flex flex-col">
      {article.coverUrl && (
        <div className="-mx-2 -mt-2 mb-6 overflow-hidden rounded-xl">
          <img
            src={article.coverUrl}
            alt=""
            width={1200}
            height={800}
            loading="lazy"
            className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <Meta article={article} />
      <h3 className="mt-4 text-xl leading-snug transition-colors group-hover:text-primary">
        {article.title}
      </h3>
      <P className="copy-sm mt-4 line-clamp-3">{article.excerpt}</P>
    </Link>
  );
}
