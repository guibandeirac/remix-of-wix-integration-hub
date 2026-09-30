import { createFileRoute, Link } from "@tanstack/react-router";

import servicesForm from "@/assets/services-form.jpg";

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
      <section className="grain relative overflow-hidden">
        <div className="shell grid items-end gap-12 pt-20 pb-16 md:grid-cols-[1.1fr_0.9fr] md:pt-28">
          <div>
            <p className="eyebrow rise">Soluções</p>
            <h1 className="display-xl rise rise-delay-1 mt-6">
              Desenvolvimento não é um evento. É um movimento.
            </h1>
            <p className="lead rise rise-delay-2 mt-7 max-w-xl">
              Cada solução é desenhada a partir da realidade de uma operação específica, com foco no
              comportamento que precisa mudar.
            </p>
          </div>
          <img
            src={servicesForm}
            alt="Arcos esculturais empilhados em equilíbrio"
            loading="lazy"
            width={1200}
            height={912}
            className="rise rise-delay-2 w-full rounded-3xl border border-border object-cover"
          />
        </div>
      </section>

      <section className="section hairline">
        <div className="shell">
          <p className="eyebrow">O que desenhamos</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solucoes.map((item) => (
              <article key={item.title} className="panel">
                <h2 className="font-display text-xl">{item.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section hairline">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Como trabalhamos</p>
            <h2 className="display-lg mt-6">Antes, durante e depois da experiência</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {processo.map((item) => (
              <article key={item.step} className="bg-background p-7 transition-colors hover:bg-secondary">
                <span className="font-display text-xs text-primary">{item.step}</span>
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section hairline">
        <div className="shell flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="display-lg max-w-xl">Vamos olhar juntos para o seu contexto?</h2>
          <Link to="/contato" className="btn-primary">
            Agendar uma conversa diagnóstica
          </Link>
        </div>
      </section>
    </>
  );
}
