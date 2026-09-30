import { createFileRoute, Link } from "@tanstack/react-router";

import heroForm from "@/assets/hero-form.jpg";
import servicesForm from "@/assets/services-form.jpg";

export const Route = createFileRoute("/")({
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

const jeitoZum = [
  {
    title: "Intenção",
    text: "Nada é construído por acaso. Cada experiência é desenhada para gerar transformação concreta, alinhada aos objetivos das pessoas e dos negócios.",
  },
  {
    title: "Cuidado",
    text: "O desenvolvimento começa pelas pessoas. Buscamos compreender quem está aprendendo, suas realidades, desafios e potencialidades.",
  },
  {
    title: "Movimento",
    text: "Acreditamos que aprender é mudar. Criamos experiências que transformam conhecimento em ação, comportamento e resultados duradouros.",
  },
  {
    title: "Construção",
    text: "Não acreditamos em soluções de prateleira. Cocriamos caminhos junto aos nossos clientes, respeitando sua cultura, contexto e desafios únicos.",
  },
  {
    title: "Coragem",
    text: "Temos compromisso com a verdade e com a evolução. Fazemos as perguntas difíceis, desafiamos o status quo e propomos novos caminhos quando eles são necessários.",
  },
  {
    title: "Excelência",
    text: "Buscamos qualidade em cada detalhe. Unimos estratégia, criatividade e execução para entregar experiências relevantes, memoráveis e eficazes.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden">
        <div className="shell grid items-center gap-14 pt-20 pb-24 md:grid-cols-[1.05fr_0.95fr] md:pt-28 md:pb-32">
          <div>
            <p className="eyebrow rise">Consultoria boutique de aprendizagem corporativa</p>
            <h1 className="display-xl rise rise-delay-1 mt-6">
              Transformando conhecimento em comportamento.
            </h1>
            <p className="lead rise rise-delay-2 mt-7 max-w-xl">
              Estratégias de aprendizagem corporativa fundamentadas em neurociência e psicologia
              para gerar resultados reais.
            </p>
            <div className="rise rise-delay-3 mt-10 flex flex-wrap gap-3">
              <Link to="/contato" className="btn-primary">
                Agendar uma conversa diagnóstica
              </Link>
              <Link to="/solucoes" className="btn-ghost">
                Ver soluções
              </Link>
            </div>
          </div>

          <div className="rise rise-delay-2 relative">
            <img
              src={heroForm}
              alt="Forma escultural em movimento ascendente"
              width={1408}
              height={1408}
              className="w-full rounded-3xl border border-border object-cover"
            />
          </div>
        </div>
      </section>

      {/* Diagnóstico do problema */}
      <section className="section hairline">
        <div className="shell grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">O problema</p>
            <h2 className="display-lg mt-6 max-w-lg">
              Comportamento não muda por causa de um treinamento. Muda por causa do contexto em que
              ele acontece.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:pt-3">
            <p>
              As empresas investem alto em desenvolvimento e o comportamento das equipes quase não
              muda. A maioria do que chamamos de "treinamento" foi desenhado para transmitir
              informação e não para mudar comportamento. Esses são processos completamente
              diferentes.
            </p>
            <p>
              O cérebro humano não aprende por exposição a conteúdo. Aprende quando encontra
              significado. Quando algo se conecta à realidade de quem está aprendendo. Quando existe
              um contexto que sustenta o comportamento novo... antes, durante e depois da
              experiência.
            </p>
            <p className="text-foreground">
              A ZUM desenha experiências de aprendizagem ancoradas na realidade de cada operação,
              não conteúdo genérico replicado pra qualquer empresa.
            </p>
          </div>
        </div>
      </section>

      {/* Propósito, missão, visão */}
      <section className="section hairline">
        <div className="shell">
          <p className="eyebrow">No que acreditamos</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Propósito",
                text: "Fazer o aprendizado acontecer de verdade, impulsionando a evolução das pessoas e o crescimento sustentável dos negócios.",
              },
              {
                title: "Missão",
                text: "Promover experiências de aprendizagem capazes de gerar transformação individual, evolução cultural e impacto nos resultados.",
              },
              {
                title: "Visão",
                text: "Inspirar uma nova forma de desenvolver pessoas, tornando a aprendizagem um dos principais motores de crescimento das organizações.",
              },
            ].map((item) => (
              <article key={item.title} className="panel">
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* O jeito ZUM */}
      <section className="section hairline">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Princípios</p>
              <h2 className="display-lg mt-5">O jeito ZUM de fazer</h2>
            </div>
            <Link to="/sobre" className="link-underline text-muted-foreground hover:text-foreground">
              Conheça a Zum e o Pedro
            </Link>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {jeitoZum.map((item, i) => (
              <article key={item.title} className="bg-background p-7 transition-colors hover:bg-secondary">
                <span className="font-display text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Movimento + CTA */}
      <section className="section hairline">
        <div className="shell grid items-center gap-14 md:grid-cols-2">
          <img
            src={servicesForm}
            alt="Arcos esculturais empilhados em equilíbrio"
            loading="lazy"
            width={1200}
            height={912}
            className="w-full rounded-3xl border border-border object-cover"
          />
          <div>
            <p className="eyebrow">Aprender é gerar movimento</p>
            <h2 className="display-lg mt-6">Transformando estratégia em comportamento</h2>
            <p className="lead mt-6">
              Nós acreditamos que o desenvolvimento humano é o motor de crescimento sustentável das
              organizações. Criamos experiências de aprendizagem fundamentadas em psicologia
              comportamental e neurociência aplicada para gerar impacto real.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contato" className="btn-primary">
                Fale conosco
              </Link>
              <Link to="/solucoes" className="btn-ghost">
                Como trabalhamos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
