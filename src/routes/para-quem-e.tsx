import { useId, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { IsotipoOutline } from "@/components/brand-graphics";
import { P } from "@/components/text";
import { ZumObject } from "@/components/zum-object";
import { perfis, type Perfil } from "@/lib/perfis";

export const Route = createFileRoute("/para-quem-e")({
  // ?perfil=ceo abre direto o perfil escolhido (usado pelos atalhos da Home)
  validateSearch: (search: Record<string, unknown>): { perfil?: string } =>
    typeof search["perfil"] === "string" ? { perfil: search["perfil"] } : {},
  head: () => ({
    meta: [
      { title: "Para quem é — Zum Educação" },
      {
        name: "description",
        content:
          "CEOs, founders, gestores, RH e diretores: a ZUM transforma desenvolvimento em comportamento, e comportamento em resultado. Escolha o seu momento.",
      },
      { property: "og:title", content: "Para quem é a ZUM" },
      {
        property: "og:description",
        content: "Você não precisa saber qual solução contratar. Precisa reconhecer o desafio.",
      },
    ],
  }),
  component: ParaQuemE,
});

const pad = (i: number) => String(i + 1).padStart(2, "0");

function ParaQuemE() {
  return (
    <>
      <section className="grain relative isolate overflow-hidden">
        <IsotipoOutline className="absolute top-[-30%] right-[-18%] -z-10 w-[min(940px,120vw)] opacity-80" />
        <div className="shell pt-20 pb-16 md:pt-28 md:pb-20">
          <P className="eyebrow rise">Para quem é a ZUM</P>
          <h1 className="display-xl rise rise-delay-1 mt-6 max-w-4xl">
            Você não precisa saber qual solução contratar. Precisa reconhecer o <em>desafio.</em>
          </h1>
          <P className="lead rise rise-delay-2 mt-7 max-w-2xl">
            A ZUM trabalha com pessoas e empresas que querem transformar desenvolvimento em
            comportamento (e comportamento em resultado).
          </P>
        </div>
      </section>

      <section id="perfis" className="section hairline scroll-mt-20">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-lg">
              Escolha o seu <em>momento</em>
            </h2>
            <span className="meta">{perfis.length} perfis · toque para abrir</span>
          </div>
          <PerfilSelector />
        </div>
      </section>

      <section className="section-light section">
        <div className="shell grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end lg:gap-20">
          <div>
            <P className="eyebrow">Ainda em dúvida?</P>
            <h2 className="display-lg mt-6">
              Talvez você ainda não saiba qual é a solução. <em>Tudo bem.</em>
            </h2>
          </div>
          <div>
            <P className="copy">
              A ZUM começa antes do treinamento: entendemos o contexto, identificamos o
              comportamento que precisa mudar e construímos a experiência adequada para aquele
              desafio.
            </P>
            <p className="mt-8 font-display text-xl font-medium tracking-tight">
              Vamos conversar sobre o seu contexto?
            </p>
            <Link to="/contato" className="btn-primary mt-6">
              Agendar uma conversa diagnóstica <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** Lista de perfis: abas com painel no desktop, acordeão no celular. */
function PerfilSelector() {
  const { perfil } = Route.useSearch();
  const initial = Math.max(
    0,
    perfis.findIndex((p) => p.slug === perfil),
  );
  const [active, setActive] = useState(initial);
  const [openMobile, setOpenMobile] = useState<number | null>(initial);
  const id = useId();
  const current = perfis[active] ?? perfis[0]!;

  return (
    <>
      {/* Desktop: abas + painel */}
      <div className="mt-12 hidden gap-16 lg:grid lg:grid-cols-[0.95fr_1.05fr]">
        <div
          role="tablist"
          aria-label="Perfis"
          aria-orientation="vertical"
          className="border-t border-border"
        >
          {perfis.map((perfil, i) => (
            <button
              key={perfil.role}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${id}-panel`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const next =
                    (i + (e.key === "ArrowDown" ? 1 : perfis.length - 1)) % perfis.length;
                  setActive(next);
                  document.getElementById(`${id}-tab-${next}`)?.focus();
                }
              }}
              className="profile-tab"
            >
              <span className="num text-xl">[{pad(i)}]</span>
              <span className="profile-role">{perfil.role}</span>
              <span className="profile-chevron" aria-hidden="true">
                +
              </span>
              <span className="profile-hint">“{perfil.quote}”</span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <article key={active} className="plate profile-panel">
            <div className="flex items-start justify-between gap-6 p-8 pb-0">
              <div>
                <span className="meta">
                  <span className="text-foreground">[{pad(active)}]</span>&nbsp;&nbsp;
                  {current.role}
                </span>
                <p className="profile-quote mt-6">{current.quote}</p>
              </div>
              <div className="plate-stage w-32 shrink-0 rounded-xl border border-border xl:w-40">
                <span className="plate-marks" />
                <ZumObject name={current.object} depth={0.4} style={{ width: "62%" }} />
              </div>
            </div>
            <PerfilBody perfil={current} className="p-8" />
          </article>
        </div>
      </div>

      {/* Celular e tablet: acordeão */}
      <div className="mt-10 border-t border-border lg:hidden">
        {perfis.map((perfil, i) => {
          const open = openMobile === i;
          return (
            <div key={perfil.role}>
              <button
                type="button"
                id={`${id}-acc-${i}`}
                aria-expanded={open}
                aria-controls={`${id}-acc-panel-${i}`}
                onClick={() => setOpenMobile(open ? null : i)}
                className="profile-tab"
              >
                <span className="num text-xl">[{pad(i)}]</span>
                <span className="profile-role">{perfil.role}</span>
                <span className="profile-chevron" aria-hidden="true">
                  +
                </span>
                <span className="profile-hint">“{perfil.quote}”</span>
              </button>
              {open && (
                <div
                  id={`${id}-acc-panel-${i}`}
                  role="region"
                  aria-labelledby={`${id}-acc-${i}`}
                  className="profile-panel pt-6 pb-10"
                >
                  <PerfilBody perfil={perfil} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function PerfilBody({ perfil, className }: { perfil: Perfil; className?: string }) {
  return (
    <div className={className}>
      <P className="text-lg leading-relaxed font-normal text-foreground">{perfil.challenge}</P>
      <P className="copy mt-5">{perfil.how}</P>
      <p className="meta mt-8">A ZUM pode ajudar com</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {perfil.help.map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
      </ul>
      <Link to="/solucoes" className="link-underline mt-9 inline-flex items-center gap-2">
        Ver como a ZUM pode ajudar <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
