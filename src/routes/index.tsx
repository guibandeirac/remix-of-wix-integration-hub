import type { CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { ChromeIsotipo, IsotipoOutline } from "@/components/brand-graphics";
import { P } from "@/components/text";
import { ObjectPlate, ZumObject } from "@/components/zum-object";
import type { ZumObjectName } from "@/lib/zum-objects";

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

const fundamentos = ["Neurociência aplicada", "Psicologia comportamental", "Desenho sob medida"];

const crencas: { title: string; label: string; object: ZumObjectName; text: string }[] = [
  {
    title: "Propósito",
    label: "Direção",
    object: "arrow",
    text: "Fazer o aprendizado acontecer de verdade, impulsionando a evolução das pessoas e o crescimento sustentável dos negócios.",
  },
  {
    title: "Missão",
    label: "Movimento",
    object: "spring",
    text: "Promover experiências de aprendizagem capazes de gerar transformação individual, evolução cultural e impacto nos resultados.",
  },
  {
    title: "Visão",
    label: "Perspectiva",
    object: "orbit",
    text: "Inspirar uma nova forma de desenvolver pessoas, tornando a aprendizagem um dos principais motores de crescimento das organizações.",
  },
];

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

const pad = (i: number) => String(i + 1).padStart(2, "0");

function Home() {
  return (
    <>
      {/* Hero */}
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
              <Link to="/solucoes" className="btn-ghost">
                Ver soluções
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

      {/* Diagnóstico do problema */}
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
              index="02"
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

      {/* Propósito, missão, visão */}
      <section className="section hairline">
        <div className="shell">
          <p className="eyebrow">No que acreditamos</p>
          <h2 className="display-lg mt-5">
            O que nos <em>move</em>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {crencas.map((item, i) => (
              <article key={item.title} className="plate">
                <div className="plate-stage" style={{ aspectRatio: "4 / 3" }}>
                  <span className="plate-marks" />
                  <ZumObject name={item.object} depth={0.5} style={{ width: "44%" }} />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="meta">
                    <span className="text-foreground">[{pad(i)}]</span>&nbsp;&nbsp;{item.label}
                  </span>
                  <h3 className="mt-5 text-2xl font-medium tracking-tight">{item.title}</h3>
                  <P className="copy-sm mt-3">{item.text}</P>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* O jeito ZUM: seção clara, como as páginas cinza do brand guide */}
      <section className="section-light section">
        <IsotipoOutline
          className="absolute top-[6%] right-[-14%] -z-10 hidden w-[min(880px,90vw)] md:block"
          style={{ "--iso-stroke": "rgb(35 35 35 / 0.16)" } as CSSProperties}
          glow={false}
        />
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Princípios</p>
              <h2 className="display-lg mt-5">
                O jeito <em>ZUM</em> de fazer
              </h2>
            </div>
            <Link
              to="/sobre"
              className="link-underline text-muted-foreground hover:text-foreground"
            >
              Conheça a Zum e o Pedro
            </Link>
          </div>

          <div className="mt-14 grid gap-x-12 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {jeitoZum.map((item, i) => (
              <article key={item.title} className="border-b border-border py-9">
                <span className="num text-3xl">[{pad(i)}]</span>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{item.title}</h3>
                <P className="copy-sm mt-3">{item.text}</P>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Movimento + CTA */}
      <section className="section">
        <div className="shell grid items-center gap-14 md:grid-cols-2 lg:gap-20">
          <ObjectPlate
            name="stack"
            index="03"
            label="Construção"
            note="Camada a camada"
            ratio="4 / 5"
            size="50%"
          />
          <div>
            <p className="eyebrow">Aprender é gerar movimento</p>
            <h2 className="display-lg mt-6">
              Transformando estratégia em <em>comportamento</em>
            </h2>
            <P className="lead mt-6">
              Nós acreditamos que o desenvolvimento humano é o motor de crescimento sustentável das
              organizações. Criamos experiências de aprendizagem fundamentadas em psicologia
              comportamental e neurociência aplicada para gerar impacto real.
            </P>
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
