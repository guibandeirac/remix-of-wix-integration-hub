import { useEffect, useId, useRef, type CSSProperties } from "react";

import chromeIsotipo from "@/assets/chrome-isotipo.webp";
import isotipoMask from "@/assets/isotipo-mask.png";
import { ISO_HEIGHT, ISO_NODES, ISO_PATH, ISO_WIDTH } from "@/lib/isotipo";
import { clamp, lerp, prefersReducedMotion, subscribeWhileVisible } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Elementos gráficos próprios, derivados do isotipo e do grid de construção
// do brand guide: o isotipo vazado, o isotipo cromado e a trajetória.

const PAD = 120;
const VIEWBOX = `${-PAD} ${-PAD} ${ISO_WIDTH + PAD * 2} ${ISO_HEIGHT + PAD * 2}`;

/** Converte a posição do cursor para coordenadas do viewBox de um <svg>. */
function toSvgPoint(svg: SVGSVGElement, x: number, y: number) {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const p = new DOMPoint(x, y).matrixTransform(ctm.inverse());
  return { x: p.x, y: p.y };
}

/** Marca o elemento como visível na primeira vez que entra na tela. */
function useReveal<T extends Element>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.setAttribute("data-visible", "");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.setAttribute("data-visible", "");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

// Guias diagonais que prolongam as arestas retas do isotipo, como no brand guide.
const GUIDES: ReadonlyArray<readonly [number, number, number, number]> = [
  [1705, 34, 879, 868],
  [609, 989, 218, 1484],
  [999, 1000, 1916, 1478],
  [0, 74, 590, 469],
];

function extend([x1, y1, x2, y2]: readonly [number, number, number, number], k = 4) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return { x1: x1 - dx * k, y1: y1 - dy * k, x2: x2 + dx * k, y2: y2 + dy * k };
}

type OutlineProps = {
  className?: string;
  /** Grid de construção com guias diagonais. */
  grid?: boolean;
  /** Pontos de ancoragem nas curvas. */
  nodes?: boolean;
  /** Um brilho percorre o contorno perto do cursor. */
  glow?: boolean;
  style?: CSSProperties;
};

/** Isotipo vazado: o contorno da marca em traço fino, desenhado ao entrar na tela. */
export function IsotipoOutline({
  className,
  grid = false,
  nodes = false,
  glow = true,
  style,
}: OutlineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradRef = useRef<SVGRadialGradientElement>(null);
  const id = useId().replace(/:/g, "");
  useReveal(svgRef);

  useEffect(() => {
    const svg = svgRef.current;
    const grad = gradRef.current;
    if (!svg || !grad || !glow || prefersReducedMotion()) return;
    const cur = { x: ISO_WIDTH * 0.7, y: ISO_HEIGHT * 0.2 };
    return subscribeWhileVisible(svg, (s) => {
      const t = s.time / 1000;
      const p = s.hasPointer ? toSvgPoint(svg, s.x, s.y) : null;
      // Sem cursor, a luz percorre a forma lentamente.
      const tx = p?.x ?? ISO_WIDTH * (0.5 + Math.cos(t * 0.25) * 0.45);
      const ty = p?.y ?? ISO_HEIGHT * (0.5 + Math.sin(t * 0.25) * 0.45);
      cur.x = lerp(cur.x, tx, 0.08);
      cur.y = lerp(cur.y, ty, 0.08);
      grad.setAttribute("cx", cur.x.toFixed(1));
      grad.setAttribute("cy", cur.y.toFixed(1));
    });
  }, [glow]);

  return (
    <svg
      ref={svgRef}
      viewBox={VIEWBOX}
      className={cn("iso-outline", className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient
          ref={gradRef}
          id={`glow-${id}`}
          gradientUnits="userSpaceOnUse"
          cx={ISO_WIDTH * 0.7}
          cy={ISO_HEIGHT * 0.2}
          r="520"
        >
          <stop offset="0" stopColor="#f9f9f9" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#a0b3c4" stopOpacity="0.45" />
          <stop offset="1" stopColor="#a0b3c4" stopOpacity="0" />
        </radialGradient>
        {grid && (
          <>
            <radialGradient id={`fade-${id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0.55" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={`grid-mask-${id}`} maskUnits="userSpaceOnUse">
              <rect
                x={-PAD}
                y={-PAD}
                width={ISO_WIDTH + PAD * 2}
                height={ISO_HEIGHT + PAD * 2}
                fill={`url(#fade-${id})`}
              />
            </mask>
          </>
        )}
      </defs>

      {grid && (
        <g className="iso-grid" mask={`url(#grid-mask-${id})`}>
          {Array.from({ length: Math.floor((ISO_WIDTH + PAD * 2) / 120) + 1 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={-PAD + i * 120}
              y1={-PAD}
              x2={-PAD + i * 120}
              y2={ISO_HEIGHT + PAD}
            />
          ))}
          {Array.from({ length: Math.floor((ISO_HEIGHT + PAD * 2) / 120) + 1 }, (_, i) => (
            <line
              key={`h${i}`}
              x1={-PAD}
              y1={-PAD + i * 120}
              x2={ISO_WIDTH + PAD}
              y2={-PAD + i * 120}
            />
          ))}
          {GUIDES.map((g, i) => (
            <line key={`g${i}`} className="iso-guide" {...extend(g)} />
          ))}
        </g>
      )}

      <path className="iso-stroke" d={ISO_PATH} pathLength={1} />
      {glow && <path className="iso-glow" d={ISO_PATH} stroke={`url(#glow-${id})`} />}

      {nodes && (
        <g className="iso-nodes">
          {ISO_NODES.map(([x, y], i) => (
            <rect
              key={i}
              x={x - 14}
              y={y - 14}
              width="28"
              height="28"
              style={{ "--n": i } as CSSProperties}
            />
          ))}
        </g>
      )}
    </svg>
  );
}

/**
 * Isotipo cromado: o metal é pré-renderizado (src/assets/chrome-isotipo.webp, gerado
 * com o mesmo filtro de iluminação do SVG) e o reflexo que acompanha o cursor é um
 * degradê recortado pela forma do isotipo. Assim o efeito roda na GPU, sem recalcular
 * filtros de iluminação a cada quadro.
 */
export function ChromeIsotipo({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const cur = { lx: 30, ly: 12, tx: 0, ty: 0 };

    return subscribeWhileVisible(root, (s) => {
      const t = s.time / 1000;
      const r = root.getBoundingClientRect();
      const inside = s.hasPointer;
      // Sem cursor, o reflexo percorre o metal lentamente.
      const tlx = inside ? ((s.x - r.left) / r.width) * 100 : 50 + Math.cos(t * 0.35) * 45;
      const tly = inside ? ((s.y - r.top) / r.height) * 100 : 40 + Math.sin(t * 0.35) * 35;
      const dx = clamp((s.x - (r.left + r.width / 2)) / s.vw, -0.5, 0.5);
      const dy = clamp((s.y - (r.top + r.height / 2)) / s.vh, -0.5, 0.5);

      cur.lx = lerp(cur.lx, clamp(tlx, -40, 140), 0.07);
      cur.ly = lerp(cur.ly, clamp(tly, -40, 140), 0.07);
      cur.tx = lerp(cur.tx, inside ? dx * 18 : 0, 0.05);
      cur.ty = lerp(cur.ty, inside ? dy * 12 : 0, 0.05);

      root.style.setProperty("--lx", `${cur.lx.toFixed(2)}%`);
      root.style.setProperty("--ly", `${cur.ly.toFixed(2)}%`);
      root.style.setProperty("--tx", `${cur.tx.toFixed(2)}px`);
      root.style.setProperty("--ty", `${cur.ty.toFixed(2)}px`);
    });
  }, []);

  return (
    <div ref={rootRef} className={cn("chrome-iso", className)} aria-hidden="true">
      <div className="chrome-iso-body">
        <img src={chromeIsotipo} alt="" draggable={false} className="chrome-iso-img" />
        <span
          className="chrome-iso-sheen"
          style={{ maskImage: `url(${isotipoMask})`, WebkitMaskImage: `url(${isotipoMask})` }}
        />
        <svg viewBox={VIEWBOX} className="chrome-iso-rim" focusable="false">
          <path d={ISO_PATH} />
        </svg>
      </div>
      <span className="chrome-iso-shadow" />
    </div>
  );
}

/**
 * Trajetória: uma linha que nasce difusa e termina ascendente, desenhada conforme
 * o scroll. Representa o caminho de escutar até sustentar o resultado.
 */
export function Trajectory({ steps, className }: { steps: number; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return;
    if (prefersReducedMotion()) {
      root.style.setProperty("--progress", "1");
      return;
    }
    let cur = 0;
    return subscribeWhileVisible(root, (s) => {
      const r = root.getBoundingClientRect();
      // 0 quando entra pela base da tela, 1 quando chega a ~40% do topo.
      const target = clamp((s.vh - r.top) / (s.vh * 0.6), 0, 1);
      cur = lerp(cur, target, 0.08);
      root.style.setProperty("--progress", cur.toFixed(4));
      path.style.strokeDashoffset = (1 - cur).toFixed(4);
    });
  }, []);

  // Pontos sobem a cada etapa: o resultado é ascendente.
  const ys = Array.from({ length: steps }, (_, i) => 92 - (i / Math.max(1, steps - 1)) * 64);
  const xs = Array.from({ length: steps }, (_, i) => ((i + 0.5) / steps) * 1000);
  let d = `M 0 ${ys[0]! + 18}`;
  xs.forEach((x, i) => {
    const px = i === 0 ? 0 : xs[i - 1]!;
    const py = i === 0 ? ys[0]! + 18 : ys[i - 1]!;
    const mx = (px + x) / 2;
    d += ` C ${mx} ${py}, ${mx} ${ys[i]}, ${x} ${ys[i]}`;
  });
  d += ` C ${xs[steps - 1]! + 60} ${ys[steps - 1]}, 960 8, 1000 4`;

  return (
    <div ref={rootRef} className={cn("trajectory", className)} aria-hidden="true">
      <svg viewBox="0 0 1000 120" preserveAspectRatio="none" focusable="false">
        <path className="trajectory-base" d={d} />
        <path ref={pathRef} className="trajectory-line" d={d} pathLength={1} />
      </svg>
      {xs.map((x, i) => (
        <span
          key={i}
          className="trajectory-node"
          style={
            {
              left: `${x / 10}%`,
              top: `${(ys[i]! / 120) * 100}%`,
              "--at": ((i + 0.5) / steps).toFixed(3),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
