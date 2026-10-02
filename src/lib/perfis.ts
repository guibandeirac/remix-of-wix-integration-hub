import type { ZumObjectName } from "@/lib/zum-objects";

// Perfis da página "Para quem é", também resumidos na Home.

export type Perfil = {
  /** Identificador usado no link ?perfil= */
  slug: string;
  role: string;
  quote: string;
  challenge: string;
  how: string;
  help: string[];
  object: ZumObjectName;
};

export const perfis: Perfil[] = [
  {
    slug: "ceo",
    role: "CEO",
    quote: "Minha empresa cresceu. Agora precisamos fazer as pessoas crescerem junto.",
    challenge:
      "Você precisa conectar estratégia, cultura e comportamento sem transformar desenvolvimento em uma coleção de treinamentos.",
    how: "A ZUM ajuda CEOs a transformar desafios de negócio em experiências de aprendizagem que desenvolvem líderes, fortalecem a cultura e preparam a organização para os próximos movimentos.",
    help: [
      "Jornadas de liderança",
      "Universidades corporativas",
      "Programas sob medida",
      "Diagnóstico de aprendizagem",
      "Team Building e Convenções",
    ],
    object: "arrow",
  },
  {
    slug: "founders",
    role: "Founders e Sócios",
    quote: "Quero crescer sem perder a cultura — e sem depender de mim para tudo.",
    challenge:
      "À medida que a empresa cresce, decisões antes centralizadas precisam virar contexto, autonomia e comportamento compartilhado.",
    how: "A ZUM ajuda founders a estruturar experiências que desenvolvem a liderança, aceleram a maturidade da equipe e transformam aquilo que antes estava “na cabeça dos fundadores” em cultura praticada pela organização.",
    help: [
      "Onboarding",
      "Desenvolvimento de líderes",
      "Programas sob medida",
      "Comunidades de liderança",
    ],
    object: "stack",
  },
  {
    slug: "gestores",
    role: "Gestores de Equipes",
    quote: "Eu sei o que minha equipe precisa fazer. O desafio é fazer isso acontecer.",
    challenge:
      "Liderar exige muito mais do que conhecer ferramentas. Exige repertório, prática e contexto para transformar conhecimento em comportamento no dia a dia.",
    how: "A ZUM cria experiências de desenvolvimento conectadas aos desafios reais da liderança — da comunicação à tomada de decisão, da gestão de conflitos à construção de times de alta performance.",
    help: [
      "Jornadas de liderança",
      "Comunidades de liderança",
      "Workshops",
      "Programas sob medida",
    ],
    object: "spring",
  },
  {
    slug: "rh",
    role: "RH, People & Desenvolvimento",
    quote:
      "Temos iniciativas de desenvolvimento. Mas ainda falta conexão com a realidade do negócio.",
    challenge:
      "Você precisa construir experiências relevantes para as pessoas e, ao mesmo tempo, responder às prioridades da organização.",
    how: "A ZUM atua como parceira estratégica para diagnosticar desafios, desenhar experiências de aprendizagem e transformar ações isoladas em jornadas que geram continuidade, prática e impacto.",
    help: [
      "Universidades corporativas",
      "Diagnóstico de aprendizagem",
      "Jornadas de liderança",
      "Onboarding",
      "Programas sob medida",
    ],
    object: "cross",
  },
  {
    slug: "diretores",
    role: "Diretores e Heads",
    quote:
      "Preciso mudar um comportamento da minha área, não simplesmente contratar um treinamento.",
    challenge:
      "Novos processos, crescimento, reestruturações e mudanças estratégicas exigem que as pessoas façam coisas diferentes.",
    how: "A ZUM traduz desafios específicos da operação em experiências de aprendizagem desenhadas para gerar mudança concreta de comportamento.",
    help: [
      "Programas sob medida",
      "Workshops",
      "Diagnóstico de aprendizagem",
      "Jornadas de liderança",
    ],
    object: "hourglass",
  },
];
