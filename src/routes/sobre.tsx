import { createFileRoute, Link } from "@tanstack/react-router";

import { PedroPortrait } from "@/components/pedro-portrait";
import { IsotipoOutline } from "@/components/brand-graphics";
import { ObjectPlate } from "@/components/zum-object";
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

      <section className="section hairline">
        <div className="shell grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="max-w-3xl">
            <P className="eyebrow">Propósito</P>
            <h2 className="display-md mt-6">
              Fazer o aprendizado acontecer <em>de verdade</em>, impulsionando a evolução das
              pessoas e o crescimento sustentável dos negócios.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contato" className="btn-primary">
                Conversar com a Zum
              </Link>
              <Link to="/solucoes" className="btn-ghost">
                Ver soluções
              </Link>
            </div>
          </div>
          <ObjectPlate
            name="cross"
            index="04"
            label="Conexão"
            note="Ciência · Estratégia · Pessoas"
            ratio="1 / 1"
            size="46%"
          />
        </div>
      </section>
    </>
  );
}
