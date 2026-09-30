import { createFileRoute, Link } from "@tanstack/react-router";

import aboutForm from "@/assets/about-form.jpg";

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
      <section className="grain relative overflow-hidden">
        <div className="shell pt-20 pb-16 md:pt-28">
          <p className="eyebrow rise">Sobre</p>
          <h1 className="display-xl rise rise-delay-1 mt-6 max-w-3xl">
            Ciência, estratégia e cuidado com quem aprende.
          </h1>
        </div>
      </section>

      <section className="hairline section">
        <div className="shell grid gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <img
              src={aboutForm}
              alt="Formas de cerâmica que se encaixam"
              loading="lazy"
              width={1200}
              height={1504}
              className="w-full rounded-3xl border border-border object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Fundador</p>
            <h2 className="display-lg mt-5">Pedro Demetrius</h2>
            <p className="lead mt-6">
              Psicólogo e fundador da Zum, Pedro atua no desenvolvimento de pessoas e lideranças por
              meio de soluções de aprendizagem que unem ciência, estratégia e resultados.
            </p>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {trajetoria.map((item) => (
                <article key={item.title} className="bg-background p-7">
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Na Zum, sua missão é ajudar organizações a desenvolver líderes e equipes capazes de
              gerar resultados sustentáveis por meio de experiências de aprendizagem que realmente
              impactam o comportamento e a cultura.
            </p>
          </div>
        </div>
      </section>

      <section className="section hairline">
        <div className="shell max-w-3xl">
          <p className="eyebrow">Propósito</p>
          <h2 className="display-lg mt-6">
            Fazer o aprendizado acontecer de verdade, impulsionando a evolução das pessoas e o
            crescimento sustentável dos negócios.
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
      </section>
    </>
  );
}
