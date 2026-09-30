import { createFileRoute, Link } from "@tanstack/react-router";

import { RichContent } from "@/components/rich-content";
import { formatArticleDate } from "@/lib/format";
import { getArticle } from "@/lib/wix";

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
          <p className="rise rise-delay-1 mt-10 text-xs tracking-wide text-muted-foreground uppercase">
            {formatArticleDate(article.publishedAt)}
            {article.minutesToRead > 0 && ` · ${article.minutesToRead} min de leitura`}
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

      <section className="hairline section">
        <div className="shell max-w-3xl">
          <p className="eyebrow">Conversa diagnóstica</p>
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
