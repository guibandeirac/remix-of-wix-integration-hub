import { Suspense, type CSSProperties } from "react";
import { Await, createFileRoute, Link } from "@tanstack/react-router";

import { ChromeIsotipo, IsotipoOutline, Trajectory } from "@/components/brand-graphics";
import { FounderCard } from "@/components/founder-card";
import { P } from "@/components/text";
import { ObjectPlate } from "@/components/zum-object";
import { formatArticleDate } from "@/lib/format";
import { perfis } from "@/lib/perfis";
import { listArticles, type ArticleSummary } from "@/lib/wix";

export const Route = createFileRoute("/")({
  // Os artigos chegam depois, sem atrasar o carregamento da página.
  loader: () => ({ articles: listArticles() }),
  head: () => ({
    meta: [
      { title: "Zum Educação — Transformando conhecimento em comportamento" },
      {
        name: "description",
        content:
          "Estratégias de aprendizagem corporativa fundamentadas em neurociência e psicologia para gerar resultados reais.",
      },
      {
        property: "og:title",
        content: "Zum Educação — Transformando conhecimento em comportamento",
      },
      {
        property: "og:description",
        content:
          "Experiências de aprendizagem ancoradas na realidade de cada operação. Desenvolvimento não é um evento, é um movimento.",
      },
    ],
  }),
  component: Home,
});

const fundamentos = ["Neurociência aplicada", "Psicologia comportamental", "Desenho sob medida"];

// Resumo do processo descrito em Soluções › Como trabalhamos.
const etapas = [
  { name: "Diagnóstico", text: "Entender a operação e o comportamento que precisa mudar." },
  { name: "Desenho", text: "Construir a experiência com psicologia e neurociência aplicada." },
  { name: "Experiência", text: "Prática e significado, conectados à realidade de quem aprende." },
  { name: "Sustentação", text: "Criar o contexto que mantém o comportamento novo." },
  { name: "Impacto", text: "Comportamento que se transforma em resultado para o negócio." },
];

// Os mesmos grupos da página Soluções, só pelo nome.
const solucoes = [
  "Jornadas de liderança",
  "Onboarding e integração",
  "Universidades corporativas",
  "Comunidades de liderança",
  "Programas sob medida",
  "Diagnóstico de aprendizagem",
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

type CtaTarget = "/para-quem-e" | "/solucoes" | "/sobre" | "/artigos";

/** Chamada de seção: leva à página que aprofunda o assunto. */
function SectionCta({ to, hash, children }: { to: CtaTarget; hash?: string; children: string }) {
  return (
    <Link to={to} {...(hash ? { hash } : {})} className="section-cta">
      {children}
      <span className="section-cta-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function Home() {
  const { articles } = Route.useLoaderData();

  return (
    <>
      {/* 1. Apresentar */}
      <section className="grain relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_78%_30%,rgb(160_179_196/0.13),transparent_70%)]" />
        <div className="shell grid items-center gap-12 pt-16 pb-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:pt-24 lg:gap-16">
          <div>
            <p className="eyebrow rise">Consultoria boutique de aprendizagem corporativa</p>
            <h1 className="display-xl rise rise-delay-1 mt-7">
              Transformando conhecimento{" "}
              <span className="whitespace-nowrap">
                em <em>comportamento.</em>
              </span>
            </h1>
            <P className="lead rise rise-delay-2 mt-7 max-w-xl">
              Estratégias de aprendizagem corporativa fundamentadas em neurociência e psicologia
              para gerar resultados reais.
            </P>
            <div className="rise rise-delay-3 mt-10 flex flex-wrap gap-3">
              <Link to="/contato" className="btn-primary">
                Agendar uma conversa diagnóstica
              </Link>
              <Link to="/para-quem-e" className="btn-ghost">
                Para quem é a ZUM
              </Link>
            </div>
          </div>

          {/* Espécime: o isotipo cromado sobre o próprio grid de construção */}
          <figure className="relative mx-auto w-full max-w-[36rem]">
            <div className="relative">
              <IsotipoOutline grid nodes className="absolute inset-0 h-full w-full" />
              <ChromeIsotipo className="relative" />
            </div>
          </figure>
        </div>

        <div className="shell">
          <ul className="grid border-y border-border sm:grid-cols-3">
            {fundamentos.map((item, i) => (
              <li key={item} className="meta flex items-center gap-4 py-5">
                <span className="num text-base">[{pad(i)}]</span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Contextualizar: o problema */}
      <section className="section">
        <div className="shell grid gap-12 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-12">
            <div>
              <p className="eyebrow">O problema</p>
              <h2 className="display-md mt-6 max-w-lg">
                Comportamento não muda por causa de um treinamento. Muda por causa do{" "}
                <em>contexto</em> em que ele acontece.
              </h2>
            </div>
            <ObjectPlate
              name="hourglass"
              index="01"
              label="Contexto"
              note="Antes · Durante · Depois"
              ratio="5 / 4"
              size="34%"
              className="hidden md:flex"
            />
          </div>
          <div className="copy space-y-6 md:pt-14">
            <P>
              As empresas investem alto em desenvolvimento e o comportamento das equipes quase não
              muda. A maioria do que chamamos de "treinamento" foi desenhado para transmitir
              informação e não para mudar comportamento. Esses são processos completamente
              diferentes.
            </P>
            <P>
              O cérebro humano não aprende por exposição a conteúdo. Aprende quando encontra
              significado. Quando algo se conecta à realidade de quem está aprendendo. Quando existe
              um contexto que sustenta o comportamento novo... antes, durante e depois da
              experiência.
            </P>
            <P className="border-l border-primary/60 pl-6 text-lg leading-relaxed font-normal text-foreground">
              A ZUM desenha experiências de aprendizagem ancoradas na realidade de cada operação,
              não conteúdo genérico replicado pra qualquer empresa.
            </P>
          </div>
        </div>
      </section>

      {/* 3. Gerar identificação: para quem é */}
      <section className="section hairline" aria-labelledby="home-para-quem">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Para quem é a ZUM</p>
            <h2 id="home-para-quem" className="display-lg mt-5">
              Qual destas frases <em>parece</em> com a sua?
            </h2>
            <P className="lead mt-6 max-w-md">
              A ZUM trabalha com quem quer transformar desenvolvimento em comportamento. O ponto de
              partida é o seu momento, não um catálogo.
            </P>
            <div className="mt-9 hidden lg:block">
              <SectionCta to="/para-quem-e">Descubra como a ZUM pode ajudar</SectionCta>
            </div>
          </div>
          <div>
            <ul className="border-t border-border">
              {perfis.map((perfil, i) => (
                <li key={perfil.slug}>
                  <Link
                    to="/para-quem-e"
                    search={{ perfil: perfil.slug }}
                    hash="perfis"
                    className="index-row"
                  >
                    <span className="num text-lg">[{pad(i)}]</span>
                    <h3 className="index-title">{perfil.role}</h3>
                    <span className="index-arrow" aria-hidden="true">
                      →
                    </span>
                    <span className="index-note">“{perfil.quote}”</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-9 lg:hidden">
              <SectionCta to="/para-quem-e">Descubra como a ZUM pode ajudar</SectionCta>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Diferenciar: como a ZUM trabalha */}
      <section className="section-light section" aria-labelledby="home-como">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="eyebrow">Como a ZUM trabalha</p>
              <h2 id="home-como" className="display-lg mt-6 max-w-3xl">
                Não existe solução de prateleira para problemas que acontecem em contextos{" "}
                <em>diferentes.</em>
              </h2>
            </div>
            <P className="copy max-w-md lg:justify-self-end">
              Por isso a ZUM não começa pelo treinamento. Começa pelo comportamento que precisa
              mudar, e desenha o caminho até ele.
            </P>
          </div>

          <Trajectory steps={etapas.length} className="mt-14 hidden lg:block" />
          <ol className="step-chain mt-10 lg:mt-4">
            {etapas.map((etapa, i) => (
              <li key={etapa.name} className="step">
                <span className="num text-2xl lg:text-3xl">[{pad(i)}]</span>
                <h3 className="step-name">{etapa.name}</h3>
                <p className="step-text">{etapa.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <SectionCta to="/solucoes" hash="como-trabalhamos">
              Conheça nosso jeito de fazer
            </SectionCta>
          </div>
        </div>
      </section>

      {/* 5. Direcionar: soluções */}
      <section className="section" aria-labelledby="home-solucoes">
        <div className="shell grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="eyebrow">Soluções</p>
            <h2 id="home-solucoes" className="display-lg mt-6">
              Formatos desenhados para o seu <em>desafio</em>
            </h2>
            <ul className="mt-10 grid border-t border-border sm:grid-cols-2 sm:gap-x-10 md:grid-cols-1 lg:grid-cols-2">
              {solucoes.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 border-b border-border py-4">
                  <span className="num text-base">[{pad(i)}]</span>
                  <h3 className="font-display text-base font-medium tracking-tight">{item}</h3>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <SectionCta to="/solucoes">Conheça nossas soluções</SectionCta>
            </div>
          </div>
          <ObjectPlate
            name="sphere"
            index="02"
            label="Sistema"
            note="Não é evento"
            ratio="1 / 1"
            size="54%"
            className="hidden md:flex"
          />
        </div>
      </section>

      {/* 6. Humanizar: sobre */}
      <section className="section hairline" aria-labelledby="home-sobre">
        <div className="shell grid items-center gap-12 md:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <FounderCard className="mx-auto w-full max-w-[22rem] md:max-w-none" />
          <div>
            <p className="eyebrow">Sobre a ZUM</p>
            <h2 id="home-sobre" className="display-lg mt-6">
              Por trás da ZUM existe uma forma diferente de pensar <em>desenvolvimento.</em>
            </h2>
            <P className="lead mt-6 max-w-2xl">
              A ZUM foi fundada por Pedro Demetrius, psicólogo com trajetória em educação
              corporativa: programas de liderança, onboarding, universidades corporativas e jornadas
              de aprendizagem.
            </P>
            <ul className="mt-9 flex flex-wrap gap-2">
              {[
                "Psicologia comportamental",
                "Neurociência aplicada",
                "Aprendizagem corporativa",
                "Desenvolvimento de lideranças",
              ].map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <SectionCta to="/sobre">Conheça a ZUM e o Pedro</SectionCta>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Pensamento próprio: artigos */}
      <Suspense fallback={<ArticlesSection />}>
        <Await promise={articles}>{(list) => <ArticlesSection articles={list} />}</Await>
      </Suspense>

      {/* 8. Converter */}
      <section className="section-light section" aria-labelledby="home-cta">
        <IsotipoOutline
          className="absolute top-1/2 right-[-10%] -z-10 hidden w-[min(760px,80vw)] -translate-y-1/2 md:block"
          style={{ "--iso-stroke": "rgb(35 35 35 / 0.16)" } as CSSProperties}
          glow={false}
        />
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Primeiro passo</p>
            <h2 id="home-cta" className="display-lg mt-6">
              Antes de qualquer solução, uma <em>conversa.</em>
            </h2>
            <P className="lead mt-6 max-w-2xl">
              O primeiro passo não é contratar um treinamento. É entender o seu contexto e o
              comportamento que precisa mudar. A conversa diagnóstica é sem compromisso e serve para
              ver se faz sentido trabalharmos juntos.
            </P>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link to="/contato" className="btn-primary">
                Agendar uma conversa diagnóstica
              </Link>
              <a
                href="mailto:contato@zumeducacao.com.br"
                className="link-underline text-muted-foreground hover:text-foreground"
              >
                ou escreva para contato@zumeducacao.com.br
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Até três artigos recentes. Some da página se ainda não houver artigos publicados. */
function ArticlesSection({ articles }: { articles?: ArticleSummary[] }) {
  const loading = articles === undefined;
  const recent = (articles ?? []).slice(0, 3);
  if (!loading && recent.length === 0) return null;

  return (
    <section className="section hairline" aria-labelledby="home-artigos">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">Artigos</p>
          <h2 id="home-artigos" className="display-lg mt-5">
            Ideias que a ZUM <em>pensa</em> e pratica
          </h2>
          <div className="mt-9 hidden lg:block">
            <SectionCta to="/artigos">Explore nossos conteúdos</SectionCta>
          </div>
        </div>
        <div>
          <ul className="border-t border-border" aria-busy={loading}>
            {loading
              ? [0, 1, 2].map((i) => (
                  <li key={i} className="border-b border-border py-6">
                    <div className="skeleton-line w-32" />
                    <div className="skeleton-line mt-4 w-4/5" />
                  </li>
                ))
              : recent.map((article, i) => (
                  <li key={article.id}>
                    <Link
                      to="/artigos/$slug"
                      params={{ slug: article.slug }}
                      className="index-row items-center"
                    >
                      <span className="num text-lg">[{pad(i)}]</span>
                      <span className="flex min-w-0 flex-col gap-2">
                        <span className="meta flex flex-wrap gap-x-3 gap-y-1">
                          {article.category && (
                            <span className="text-primary">{article.category.label}</span>
                          )}
                          <span>{formatArticleDate(article.publishedAt)}</span>
                          {article.minutesToRead > 0 && <span>{article.minutesToRead} min</span>}
                        </span>
                        <h3 className="index-title leading-snug">{article.title}</h3>
                        {article.excerpt && (
                          <span className="index-note line-clamp-2">{article.excerpt}</span>
                        )}
                      </span>
                      {article.coverUrl ? (
                        <img
                          src={article.coverUrl}
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
          <div className="mt-9 lg:hidden">
            <SectionCta to="/artigos">Explore nossos conteúdos</SectionCta>
          </div>
        </div>
      </div>
    </section>
  );
}
