import { Link } from "@tanstack/react-router";
import { useState } from "react";

import zumIsotipo from "../assets/zum-isotipo.webp";
import zumLogo from "../assets/zum-logo.webp";

const nav = [
  { to: "/", label: "Início" },
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

        <nav className="hidden items-center gap-9 md:flex">
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-input md:hidden"
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
        <nav className="border-t border-border bg-background md:hidden">
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
            <Link to="/contato" className="btn-primary mt-3 justify-center" onClick={() => setOpen(false)}>
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
    <footer className="hairline">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={zumLogo} alt="Zum Educação Corporativa" className="h-9 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Aprender não é acumular conhecimento. É gerar movimento.
          </p>
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
              <a href="mailto:skillszum@gmail.com" className="transition-colors hover:text-foreground">
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
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zum Educação. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
