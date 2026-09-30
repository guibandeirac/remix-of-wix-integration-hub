import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Conversa diagnóstica — Zum Educação" },
      {
        name: "description",
        content:
          "Conte o desafio da sua operação e agende uma conversa diagnóstica com a Zum Educação.",
      },
      { property: "og:title", content: "Conversa diagnóstica — Zum Educação" },
      {
        property: "og:description",
        content: "Fale com a Zum sobre o comportamento que precisa mudar na sua operação.",
      },
    ],
  }),
  component: Contato,
});

const fields = [
  { id: "nome", label: "Nome", type: "text", placeholder: "Seu nome completo" },
  { id: "empresa", label: "Empresa", type: "text", placeholder: "Nome da empresa" },
  { id: "email", label: "E-mail", type: "email", placeholder: "voce@empresa.com.br" },
  { id: "telefone", label: "Telefone (opcional)", type: "tel", placeholder: "(00) 00000-0000" },
] as const;

function Contato() {
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    desafio: "",
  });

  const update = (id: string, value: string) => setForm((f) => ({ ...f, [id]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = [
      `Nome: ${form.nome}`,
      `Empresa: ${form.empresa}`,
      `E-mail: ${form.email}`,
      `Telefone: ${form.telefone || "-"}`,
      "",
      "Desafio:",
      form.desafio,
    ].join("\n");

    window.location.href = `mailto:skillszum@gmail.com?subject=${encodeURIComponent(
      `Conversa diagnóstica — ${form.empresa || form.nome}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="grain relative overflow-hidden">
      <div className="shell grid gap-16 pt-20 pb-24 md:grid-cols-[0.9fr_1.1fr] md:pt-28">
        <div>
          <p className="eyebrow rise">Contato</p>
          <h1 className="display-lg rise rise-delay-1 mt-6">Vamos começar pelo seu contexto.</h1>
          <p className="lead rise rise-delay-2 mt-6 max-w-md">
            Conte qual comportamento precisa mudar na sua operação. A conversa diagnóstica é sem
            compromisso e serve para entender se faz sentido trabalharmos juntos.
          </p>
          <div className="mt-10 space-y-3 text-sm text-muted-foreground">
            <p>
              Prefere e-mail direto?{" "}
              <a href="mailto:skillszum@gmail.com" className="text-foreground underline">
                skillszum@gmail.com
              </a>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="panel rise rise-delay-2 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label htmlFor={field.id} className="font-display text-sm">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  required={field.id !== "telefone"}
                  placeholder={field.placeholder}
                  value={form[field.id]}
                  onChange={(e) => update(field.id, e.target.value)}
                  className="min-h-12 rounded-md border border-input bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="desafio" className="font-display text-sm">
              Qual o desafio hoje?
            </label>
            <textarea
              id="desafio"
              name="desafio"
              required
              rows={6}
              placeholder="Contexto da equipe, o que já foi tentado e o resultado esperado."
              value={form.desafio}
              onChange={(e) => update("desafio", e.target.value)}
              className="rounded-md border border-input bg-background p-4 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
            />
          </div>

          <button type="submit" className="btn-primary w-full justify-center">
            Enviar e agendar conversa
          </button>
          <p className="text-xs text-muted-foreground">
            Ao enviar, abrimos seu programa de e-mail com a mensagem já preenchida para
            skillszum@gmail.com.
          </p>
        </form>
      </div>
    </section>
  );
}
