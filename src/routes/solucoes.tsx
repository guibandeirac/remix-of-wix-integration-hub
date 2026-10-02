import { createFileRoute, Link } from "@tanstack/react-router";

import { IsotipoOutline, Trajectory } from "@/components/brand-graphics";
import { ObjectPlate } from "@/components/zum-object";
import { P } from "@/components/text";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções — Zum Educação" },
      {
        name: "description",
        content:
          "Jornadas de liderança, onboarding, universidades corporativas e programas sob medida, desenhados a partir da realidade de cada operação.",
      },
      { property: "og:title", content: "Soluções — Zum Educação" },
      {
        property: "og:description",
        content:
          "Experiências de aprendizagem desenhadas sob medida: diagnóstico, desenho, facilitação e sustentação do comportamento novo.",
      },
    ],
  }),
  component: Solucoes,
});

const solucoes = [
  {
    title: "Jornadas de liderança",
    text: "Programas de desenvolvimento de líderes construídos em etapas, com prática no trabalho real e acompanhamento entre os encontros.",
  },
  {
    title: "Onboarding e integração",
    text: "Experiências de entrada que conectam a pessoa nova à cultura, ao contexto e ao comportamento esperado desde os primeiros dias.",
  },
  {
    title: "Universidades corporativas",
    text: "Estruturação de trilhas e governança de aprendizagem para que o desenvolvimento deixe de ser evento e passe a ser sistema.",
  },
  {
    title: "Comunidades de liderança",
    text: "Espaços contínuos de troca entre líderes, com curadoria de temas e facilitação, para sustentar o aprendizado ao longo do tempo.",
  },
  {
    title: "Programas sob medida",
    text: "Desenho específico para um desafio de negócio: nada de conteúdo de prateleira replicado para qualquer empresa.",
  },
  {
    title: "Diagnóstico de aprendizagem",
    text: "Leitura do contexto, das lacunas de comportamento e dos fatores que sustentam ou bloqueiam a mudança na operação.",
  },
];

const processo = [
  {
    step: "01",
    title: "Escutar",
    text: "Entendemos a operação, o comportamento que precisa mudar e o que já foi tentado antes.",
  },
  {
    step: "02",
    title: "Desenhar",
    text: "Construímos a experiência com base em psicologia comportamental e neurociência aplicada.",
  },
  {
    step: "03",
    title: "Conduzir",
    text: "Facilitamos com prática, significado e conexão direta com a realidade de quem aprende.",
  },
  {
    step: "04",
    title: "Sustentar",
    text: "Criamos o contexto que mantém o comportamento novo depois da experiência.",
  },
];

function Solucoes() {
  return (
    <>
      <section className="grain relative isolate overflow-hidden">
        <div className="shell grid items-center gap-12 pt-20 pb-20 md:grid-cols-[1.15fr_0.85fr] md:pt-28 lg:gap-20">
          <div>
            <P className="eyebrow rise">Soluções</P>
            <h1 className="display-xl rise rise-delay-1 mt-6">
              Desenvolvimento não é um evento. É um <em>movimento.</em>
            </h1>
            <P className="lead rise rise-delay-2 mt-7 max-w-xl">
              Cada solução é desenhada a partir da realidade de uma operação específica, com foco no
              comportamento que precisa mudar.
            </P>
          </div>
          <ObjectPlate
            name="sphere"
            index="01"
            label="Sistema"
            note="Não é evento"
            ratio="1 / 1"
            size="56%"
            priority
            className="rise rise-delay-2"
          />
        </div>
      </section>

      <section className="section hairline">
        <div className="shell">
          <P className="eyebrow">O que desenhamos</P>
          <h2 className="display-lg mt-5">
            Soluções <em>sob medida</em>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solucoes.map((item, i) => (
              <article key={item.title} className="panel flex flex-col">
                <span className="num">[{String(i + 1).padStart(2, "0")}]</span>
                <h3 className="mt-8 text-xl font-medium tracking-tight">{item.title}</h3>
                <P className="copy-sm mt-3">{item.text}</P>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-trabalhamos" className="section-light section scroll-mt-20">
        <div className="shell">
          <div className="max-w-2xl">
            <P className="eyebrow">Como trabalhamos</P>
            <h2 className="display-lg mt-6">
              Antes, durante e <em>depois</em> da experiência
            </h2>
          </div>
          <Trajectory steps={processo.length} className="mt-14 hidden lg:block" />
          <div className="mt-6 grid gap-x-10 border-t border-border sm:grid-cols-2 lg:mt-4 lg:grid-cols-4 lg:border-t-0">
            {processo.map((item) => (
              <article key={item.step} className="border-b border-border py-8 lg:border-b-0">
                <span className="num text-3xl">[{item.step}]</span>
                <h3 className="mt-5 text-xl font-medium tracking-tight">{item.title}</h3>
                <P className="copy-sm mt-3">{item.text}</P>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section grain relative isolate overflow-hidden">
        <IsotipoOutline className="absolute top-1/2 right-[-12%] -z-10 w-[min(760px,90vw)] -translate-y-1/2 opacity-70" />
        <div className="shell flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <P className="eyebrow">Próximo passo</P>
            <h2 className="display-lg mt-6 max-w-xl">
              Vamos olhar juntos para o seu <em>contexto?</em>
            </h2>
          </div>
          <Link to="/contato" className="btn-primary">
            Agendar uma conversa diagnóstica
          </Link>
        </div>
      </section>
    </>
  );
}
