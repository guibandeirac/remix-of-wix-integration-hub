import { createFileRoute, Link } from "@tanstack/react-router";

import { RichContent } from "@/components/rich-content";
import { formatArticleDate } from "@/lib/format";
import { getArticle } from "@/lib/wix";
import { P } from "@/components/text";

export const Route = createFileRoute("/artigos/$slug")({
  loader: ({ params }) => getArticle({ data: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.title} — Zum Educação`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.excerpt },
        ...(loaderData.coverUrl ? [{ property: "og:image", content: loaderData.coverUrl }] : []),
      ],
    };
  },
  component: Artigo,
});

function Artigo() {
  const article = Route.useLoaderData();

  return (
    <article>
      <header className="grain relative overflow-hidden">
        <div className="shell max-w-4xl pt-16 pb-12 md:pt-24">
          <Link to="/artigos" className="link-underline rise text-sm text-muted-foreground">
            ← Todos os artigos
          </Link>
          <p className="meta rise rise-delay-1 mt-10 flex flex-wrap items-center gap-x-3 gap-y-1">
            {article.category && (
              <Link
                to="/artigos"
                search={{ tema: article.category.slug }}
                hash="arquivo"
                className="text-primary transition-colors hover:text-foreground"
              >
                {article.category.label}
              </Link>
            )}
            <span>{formatArticleDate(article.publishedAt)}</span>
            {article.minutesToRead > 0 && <span>{article.minutesToRead} min de leitura</span>}
          </p>
          <h1 className="display-lg rise rise-delay-1 mt-5">{article.title}</h1>
        </div>
      </header>

      {article.coverUrl && (
        <div className="shell max-w-5xl">
          <img
            src={article.coverUrl}
            alt=""
            width={1600}
            height={900}
            className="rise rise-delay-2 aspect-[16/9] w-full rounded-3xl border border-border object-cover"
          />
        </div>
      )}

      <div className="shell max-w-3xl py-16 md:py-20">
        <RichContent nodes={article.content} />
      </div>

      {article.related.length > 0 && (
        <section className="hairline section" aria-labelledby="continue-lendo">
          <div className="shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <P className="eyebrow">Continue lendo</P>
              <h2 id="continue-lendo" className="display-md mt-5">
                {article.category &&
                article.related.every((r) => r.category?.slug === article.category?.slug) ? (
                  <>
                    Mais sobre <em>{article.category.label.toLowerCase()}</em>
                  </>
                ) : (
                  <>
                    Leituras <em>relacionadas</em>
                  </>
                )}
              </h2>
            </div>
            <ul className="border-t border-border">
              {article.related.map((item, i) => (
                <li key={item.id}>
                  <Link
                    to="/artigos/$slug"
                    params={{ slug: item.slug }}
                    className="index-row related-row items-center"
                  >
                    <span className="num text-lg">[{String(i + 1).padStart(2, "0")}]</span>
                    <span className="flex min-w-0 flex-col gap-2">
                      <span className="meta">
                        {item.category?.label}
                        {item.minutesToRead > 0 && ` · ${item.minutesToRead} min`}
                      </span>
                      <span className="index-title leading-snug">{item.title}</span>
                    </span>
                    {item.coverUrl ? (
                      <img
                        src={item.coverUrl}
                        alt=""
                        width={1200}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        className="article-thumb hidden sm:block"
                      />
                    ) : (
                      <span className="index-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-light section">
        <div className="shell max-w-3xl">
          <P className="eyebrow">Conversa diagnóstica</P>
          <h2 className="display-lg mt-6">Esse desafio parece com o da sua operação?</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contato" className="btn-primary">
              Conversar com a Zum
            </Link>
            <Link to="/artigos" className="btn-ghost">
              Ler outros artigos
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
