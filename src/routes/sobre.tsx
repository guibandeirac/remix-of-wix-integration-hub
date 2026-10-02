import type { CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PedroPortrait } from "@/components/pedro-portrait";
import { IsotipoOutline } from "@/components/brand-graphics";
import { ZumObject } from "@/components/zum-object";
import type { ZumObjectName } from "@/lib/zum-objects";
import { P } from "@/components/text";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Zum e Pedro Demetrius — Zum Educação" },
      {
        name: "description",
        content:
          "A Zum une psicologia baseada em evidências, neurociência aplicada e gestão estratégica. Conheça o fundador, Pedro Demetrius.",
      },
      { property: "og:title", content: "Sobre a Zum e Pedro Demetrius" },
      {
        property: "og:description",
        content:
          "Consultoria boutique que transforma conhecimento científico em soluções práticas para o contexto organizacional.",
      },
    ],
  }),
  component: Sobre,
});

const trajetoria = [
  {
    title: "Educação corporativa",
    text: "Liderou programas de desenvolvimento de líderes, onboarding, universidades corporativas e jornadas de aprendizagem para organizações de grande porte.",
  },
  {
    title: "Ciência aplicada",
    text: "Atuação fundamentada na Psicologia Baseada em Evidências, com ênfase na Terapia Cognitivo-Comportamental (TCC) e pós-graduação em Neurociência Aplicada à Aprendizagem e à Performance Humana.",
  },
  {
    title: "Gestão e execução",
    text: "Experiência empreendedora e liderança em projetos voluntários de grande impacto, reunindo uma visão prática sobre gestão, desenvolvimento de pessoas e execução.",
  },
];

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

function Sobre() {
  return (
    <>
      <section className="grain relative isolate overflow-hidden">
        <IsotipoOutline className="absolute top-[-30%] right-[-18%] -z-10 w-[min(980px,120vw)] opacity-80" />
        <div className="shell pt-20 pb-20 md:pt-28 md:pb-28">
          <P className="eyebrow rise">Sobre</P>
          <h1 className="display-xl rise rise-delay-1 mt-6 max-w-3xl">
            Ciência, estratégia e <em>cuidado</em> com quem aprende.
          </h1>
        </div>
      </section>

      <section className="hairline section">
        <div className="shell grid items-start gap-14 md:grid-cols-[1fr_1fr] lg:gap-20">
          <PedroPortrait className="md:sticky md:top-28" />
          <div>
            <P className="eyebrow">Fundador</P>
            <h2 className="display-lg mt-5">Pedro Demetrius</h2>
            <P className="lead mt-6">
              Psicólogo e fundador da Zum, Pedro atua no desenvolvimento de pessoas e lideranças por
              meio de soluções de aprendizagem que unem ciência, estratégia e resultados.
            </P>
            <div className="mt-10 border-t border-border">
              {trajetoria.map((item, i) => (
                <article
                  key={item.title}
                  className="grid gap-3 border-b border-border py-7 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="num">[{String(i + 1).padStart(2, "0")}]</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                    <P className="copy-sm mt-3">{item.text}</P>
                  </div>
                </article>
              ))}
            </div>
            <P className="copy mt-8">
              Na Zum, sua missão é ajudar organizações a desenvolver líderes e equipes capazes de
              gerar resultados sustentáveis por meio de experiências de aprendizagem que realmente
              impactam o comportamento e a cultura.
            </P>
          </div>
        </div>
      </section>

      {/* O jeito ZUM: seção clara, como as páginas cinza do brand guide */}
      <section id="jeito-zum" className="section-light section scroll-mt-20">
        <IsotipoOutline
          className="absolute top-[6%] right-[-14%] -z-10 hidden w-[min(880px,90vw)] md:block"
          style={{ "--iso-stroke": "rgb(35 35 35 / 0.16)" } as CSSProperties}
          glow={false}
        />
        <div className="shell">
          <P className="eyebrow">Princípios</P>
          <h2 className="display-lg mt-5">
            O jeito <em>ZUM</em> de fazer
          </h2>
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

      {/* Propósito, missão, visão */}
      <section className="section">
        <div className="shell">
          <P className="eyebrow">No que acreditamos</P>
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
          <div className="mt-14 flex flex-wrap gap-3">
            <Link to="/contato" className="btn-primary">
              Conversar com a Zum
            </Link>
            <Link to="/solucoes" className="btn-ghost">
              Ver soluções
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
