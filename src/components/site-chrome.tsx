import { Link } from "@tanstack/react-router";
import { useState } from "react";

import zumIsotipo from "../assets/zum-isotipo.webp";
import zumLogo from "../assets/zum-logo.webp";

const social = [
  {
    href: "https://instagram.com/zumeducacao",
    network: "Instagram",
    handle: "@zumeducacao",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/zum-educa%C3%A7%C3%A3o",
    network: "LinkedIn",
    handle: "Zum Educação",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.9 9H3.6v11h3.3V9Zm-1.65-5.4a1.92 1.92 0 1 0 0 3.84 1.92 1.92 0 0 0 0-3.84ZM20.4 20h-3.3v-5.4c0-1.3-.03-2.96-1.8-2.96-1.81 0-2.09 1.41-2.09 2.87V20H9.9V9h3.16v1.5h.05c.44-.83 1.51-1.7 3.1-1.7 3.32 0 3.93 2.18 3.93 5.02V20Z" />
      </svg>
    ),
  },
] as const;

const nav = [
  { to: "/", label: "Início" },
  { to: "/para-quem-e", label: "Para quem é" },
  { to: "/solucoes", label: "Soluções" },
  { to: "/sobre", label: "Sobre" },
  { to: "/artigos", label: "Artigos" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="shell flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src={zumIsotipo} alt="Zum Educação Corporativa" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "link-underline text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contato" className="btn-primary">
            Conversa diagnóstica
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-input lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-foreground transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-foreground transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display py-3 text-lg text-muted-foreground"
                activeProps={{ className: "font-display py-3 text-lg text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contato"
              className="btn-primary mt-3 justify-center"
              onClick={() => setOpen(false)}
            >
              Conversa diagnóstica
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="hairline relative overflow-hidden">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={zumLogo} alt="Zum Educação Corporativa" className="h-9 w-auto" />
          <p className="mt-5 max-w-sm font-display text-lg leading-snug font-light tracking-tight text-foreground">
            Aprender não é acumular conhecimento.{" "}
            <em className="font-light whitespace-nowrap text-primary">É gerar movimento.</em>
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {social.map((item) => (
              <a
                key={item.network}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="social-link group"
                aria-label={`${item.network} da Zum Educação (abre em nova aba)`}
              >
                <span className="social-badge">{item.icon}</span>
                <span className="flex flex-col leading-tight">
                  <span className="meta text-[0.62rem]">{item.network}</span>
                  <span className="font-display text-sm font-medium text-foreground">
                    {item.handle}
                  </span>
                </span>
                <span className="social-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Navegar</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contato</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href="mailto:skillszum@gmail.com"
                className="transition-colors hover:text-foreground"
              >
                skillszum@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.zumeducacao.com.br/"
                className="transition-colors hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                zumeducacao.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell hairline py-6">
        <p className="ui-text text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zum Educação. Todos os direitos reservados.
        </p>
      </div>
      <div className="shell" aria-hidden="true">
        <div className="footer-mark -mb-[0.2em] mt-2 select-none">ZUM©</div>
      </div>
    </footer>
  );
}
