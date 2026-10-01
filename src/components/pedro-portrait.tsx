import { useEffect, useRef, useState, type CSSProperties } from "react";

import pedroPortrait from "@/assets/pedro-portrait.webp";
import { cn } from "@/lib/utils";
import { clamp, lerp, prefersReducedMotion, subscribeWhileVisible } from "@/lib/motion";
import { P } from "@/components/text";

// Os textos que antes estavam gravados na foto agora são camadas vivas em HTML,
// posicionadas em % da imagem original (1080 × 1350) e animadas em profundidade.
const statements = [
  {
    head: ["Eu observo comportamentos."],
    sub: ["Entendo pessoas, contextos", "e o que faz uma mudança acontecer."],
    pos: { left: "51.4%", top: "18.4%" },
    depth: 1.25,
  },
  {
    head: ["Eu transformo ciência", "em experiência."],
    sub: ["Psicologia, aprendizagem", "e estratégia no mesmo lugar."],
    pos: { left: "61%", top: "42.6%" },
    depth: 1.5,
  },
  {
    head: ["Foi daí que nasceu a Zum."],
    sub: ["Uma consultoria para criar", "desenvolvimento que faz sentido."],
    pos: { left: "8.6%", top: "69.4%" },
    depth: 1.1,
  },
  {
    head: ["Não é sobre treinar."],
    sub: ["É sobre criar experiências", "que mudam o jeito de fazer."],
    pos: { left: "26.6%", top: "84%" },
    depth: 1.35,
  },
] as const;

const CYCLE_MS = 3600;

export function PedroPortrait({ className }: { className?: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState<number | null>(null);

  // Revela as camadas quando a foto entra na tela.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Destaque automático percorre as quatro frases enquanto ninguém interage.
  useEffect(() => {
    if (!revealed || hovering !== null) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % statements.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [revealed, hovering]);

  // Profundidade: inclinação do palco, parallax das camadas e luz que segue o cursor.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || prefersReducedMotion()) return;
    const cur = { px: 0, py: 0, lx: 50, ly: 35, sp: 0 };

    return subscribeWhileVisible(scene, (s) => {
      const r = scene.getBoundingClientRect();
      const inside =
        s.hasPointer &&
        s.x > r.left - 80 &&
        s.x < r.right + 80 &&
        s.y > r.top - 80 &&
        s.y < r.bottom + 80;
      const idle = s.time / 1000;

      const tpx = inside
        ? clamp(((s.x - r.left) / r.width) * 2 - 1, -1, 1)
        : Math.sin(idle * 0.5) * 0.25;
      const tpy = inside
        ? clamp(((s.y - r.top) / r.height) * 2 - 1, -1, 1)
        : Math.cos(idle * 0.4) * 0.2;
      const tlx = inside ? ((s.x - r.left) / r.width) * 100 : 50 + Math.sin(idle * 0.35) * 18;
      const tly = inside ? ((s.y - r.top) / r.height) * 100 : 34 + Math.cos(idle * 0.3) * 8;
      const tsp = clamp((r.top + r.height / 2 - s.vh / 2) / s.vh, -1, 1);

      cur.px = lerp(cur.px, tpx, 0.06);
      cur.py = lerp(cur.py, tpy, 0.06);
      cur.lx = lerp(cur.lx, tlx, 0.1);
      cur.ly = lerp(cur.ly, tly, 0.1);
      cur.sp = lerp(cur.sp, tsp, 0.1);

      scene.style.setProperty("--px", cur.px.toFixed(4));
      scene.style.setProperty("--py", cur.py.toFixed(4));
      scene.style.setProperty("--lx", `${cur.lx.toFixed(2)}%`);
      scene.style.setProperty("--ly", `${cur.ly.toFixed(2)}%`);
      scene.style.setProperty("--sp", cur.sp.toFixed(4));
    });
  }, []);

  const focus = hovering ?? active;
  const current = statements[focus] ?? statements[0];

  return (
    <figure className={cn("pp-scene", className)} data-revealed={revealed ? "" : undefined}>
      <div ref={sceneRef} className="pp-stage">
        <div className="pp-frame">
          <img
            src={pedroPortrait}
            alt="Pedro Demetrius, fundador da Zum"
            width={1080}
            height={1350}
            loading="lazy"
            decoding="async"
            className="pp-photo"
          />
          <div className="pp-light" aria-hidden="true" />
          <div className="pp-scan" aria-hidden="true" />

          <div
            className="pp-layer pp-brand"
            style={{ "--d": 0.6 } as CSSProperties}
            aria-hidden="true"
          >
            <span className="pp-metal">ZUM</span>
            <span className="pp-copy">©</span>
          </div>

          <div className="pp-layer pp-name" style={{ "--d": 0.85 } as CSSProperties}>
            <span className="pp-metal block">Pedro</span>
            <span className="pp-metal block">Demetrius</span>
            <span className="pp-role">Fundador</span>
          </div>

          {statements.map((item, i) => (
            <div
              key={item.head[0]}
              className="pp-layer pp-item"
              data-active={focus === i ? "" : undefined}
              style={{ ...item.pos, "--d": item.depth, "--i": i } as unknown as CSSProperties}
              onPointerEnter={() => setHovering(i)}
              onPointerLeave={() => {
                setHovering(null);
                setActive(i);
              }}
            >
              <span className="pp-item-float">
                <span className="pp-num">{i + 1}</span>
                <span className="pp-text">
                  {item.head.map((line) => (
                    <span key={line} className="pp-head">
                      {line}
                    </span>
                  ))}
                  {item.sub.map((line) => (
                    <span key={line} className="pp-sub">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Em telas pequenas, a frase em destaque ganha leitura confortável abaixo da foto. */}
      <figcaption className="pp-caption lg:hidden">
        <div className="flex gap-2">
          {statements.map((item, i) => (
            <button
              key={item.head[0]}
              type="button"
              aria-label={`Frase ${i + 1}`}
              aria-pressed={focus === i}
              onClick={() => setActive(i)}
              className="pp-dot"
            >
              {i + 1}
            </button>
          ))}
        </div>
        <P key={focus} className="pp-caption-text">
          <span className="font-display font-bold uppercase tracking-tight text-foreground">
            {current.head.join(" ")}
          </span>{" "}
          {current.sub.join(" ")}
        </P>
      </figcaption>
    </figure>
  );
}
