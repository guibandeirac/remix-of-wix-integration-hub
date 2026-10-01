import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { IsotipoOutline } from "@/components/brand-graphics";
import { clamp, lerp, prefersReducedMotion, subscribeWhileVisible } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { zumObjects, type ZumObjectName } from "@/lib/zum-objects";

type ZumObjectProps = {
  name: ZumObjectName;
  className?: string;
  /** Intensidade do parallax e da inclinação (0 = parado, 1 = padrão). */
  depth?: number;
  /** Graus de rotação no eixo Z ao atravessar a viewport com o scroll. */
  spin?: number;
  /** Inclinação máxima em graus quando o cursor se aproxima. */
  tilt?: number;
  /** Duração do ciclo de flutuação em segundos. */
  float?: number;
  /** Carrega a imagem sem lazy-loading (para objetos acima da dobra). */
  priority?: boolean;
  style?: CSSProperties;
};

/** Objeto 3D do kit da marca, com flutuação lenta e resposta discreta ao cursor e ao scroll. */
export function ZumObject({
  name,
  className,
  depth = 1,
  spin = 8,
  tilt = 12,
  float = 9,
  priority = false,
  style,
}: ZumObjectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const src = zumObjects[name];

  useEffect(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return;
    if (prefersReducedMotion()) {
      root.dataset["visible"] = "";
      return;
    }

    const cur = { tx: 0, ty: 0, rx: 0, ry: 0, rz: 0, s: 1 };

    return subscribeWhileVisible(root, (s) => {
      root.dataset["visible"] = "";
      const r = root.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const dx = clamp((s.x - cx) / (s.vw * 0.5), -1, 1);
      const dy = clamp((s.y - cy) / (s.vh * 0.5), -1, 1);
      const near = s.hasPointer && Math.hypot((s.x - cx) / r.width, (s.y - cy) / r.height) < 0.75;
      const progress = clamp((cy - s.vh / 2) / s.vh, -1.2, 1.2);
      const boost = near ? 1.5 : 1;

      const target = {
        tx: dx * 8 * depth * boost,
        ty: progress * 28 * depth,
        rx: -dy * tilt * 0.8 * depth * boost + clamp(s.scrollVelocity, -24, 24) * 0.25 * depth,
        ry: dx * tilt * depth * boost,
        rz: progress * spin,
        s: near ? 1.035 : 1,
      };

      cur.tx = lerp(cur.tx, target.tx, 0.06);
      cur.ty = lerp(cur.ty, target.ty, 0.08);
      cur.rx = lerp(cur.rx, target.rx, 0.06);
      cur.ry = lerp(cur.ry, target.ry, 0.06);
      cur.rz = lerp(cur.rz, target.rz, 0.07);
      cur.s = lerp(cur.s, target.s, 0.06);

      body.style.transform = `translate3d(${cur.tx.toFixed(2)}px, ${cur.ty.toFixed(2)}px, 0) rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg) rotateZ(${cur.rz.toFixed(2)}deg) scale(${cur.s.toFixed(4)})`;
      // O brilho especular acompanha a inclinação, reforçando o volume.
      body.style.setProperty("--sx", `${(50 + cur.ry * 2.4).toFixed(1)}%`);
      body.style.setProperty("--sy", `${(38 - cur.rx * 2.4).toFixed(1)}%`);
      body.style.setProperty("--glow", near ? "1" : "0.5");
    });
  }, [depth, spin, tilt]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("zum-object", className)}
      style={{ ...style, "--float-dur": `${float}s` } as CSSProperties}
    >
      <div ref={bodyRef} className="zum-object-body">
        <div className="zum-object-float">
          <img
            src={src}
            alt=""
            draggable={false}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="zum-object-img"
          />
          <span
            className="zum-object-sheen"
            style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
          />
        </div>
      </div>
      <span className="zum-object-shadow" />
    </div>
  );
}

type PlateProps = {
  name: ZumObjectName;
  /** Numeral da lâmina, ex.: "01". */
  index: string;
  /** Legenda curta, ex.: "Direção". */
  label: ReactNode;
  /** Complemento à direita da legenda. */
  note?: ReactNode;
  className?: string;
  /** Proporção do palco, ex.: "4 / 5". */
  ratio?: string;
  /** Largura do objeto dentro do palco. */
  size?: string;
  /** Contorno do isotipo cortado ao fundo. */
  outline?: boolean;
  priority?: boolean;
  spin?: number;
};

/**
 * Lâmina editorial: o objeto 3D ancorado em um palco com grid de construção,
 * marcas de corte e legenda numerada, como as pranchas de um caderno de marca.
 */
export function ObjectPlate({
  name,
  index,
  label,
  note,
  className,
  ratio = "1 / 1",
  size = "58%",
  outline = false,
  priority = false,
  spin,
}: PlateProps) {
  return (
    <figure className={cn("plate", className)} style={{ "--plate-ratio": ratio } as CSSProperties}>
      <div className="plate-stage">
        {outline && (
          <IsotipoOutline
            className="absolute -right-[38%] -bottom-[30%] w-[130%]"
            style={{ "--iso-stroke": "rgb(160 179 196 / 0.22)" } as CSSProperties}
            glow={false}
          />
        )}
        <span className="plate-marks" />
        <ZumObject
          name={name}
          depth={0.45}
          priority={priority}
          style={{ width: size }}
          {...(spin === undefined ? {} : { spin })}
        />
      </div>
      <figcaption className="plate-caption">
        <span>
          <b>[{index}]</b>&nbsp;&nbsp;{label}
        </span>
        {note && <span>{note}</span>}
      </figcaption>
    </figure>
  );
}
