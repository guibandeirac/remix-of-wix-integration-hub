import { useEffect, useRef } from "react";

// Foto com o nome já aplicado na arte.
import pedroHome from "@/assets/pedro-home.webp";
import { clamp, lerp, prefersReducedMotion, subscribeWhileVisible } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Retrato do fundador na Home: luz que segue o cursor e parallax sutil. */
export function FounderCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const cur = { lx: 50, ly: 30, tx: 0, ty: 0 };
    return subscribeWhileVisible(el, (s) => {
      const r = el.getBoundingClientRect();
      const t = s.time / 1000;
      const inside = s.hasPointer && s.x > r.left && s.x < r.right && s.y > r.top && s.y < r.bottom;
      const nx = inside ? (s.x - r.left) / r.width : 0.5 + Math.sin(t * 0.4) * 0.2;
      const ny = inside ? (s.y - r.top) / r.height : 0.3 + Math.cos(t * 0.35) * 0.08;
      cur.lx = lerp(cur.lx, nx * 100, 0.1);
      cur.ly = lerp(cur.ly, ny * 100, 0.1);
      cur.tx = lerp(cur.tx, inside ? clamp(0.5 - nx, -0.5, 0.5) * 8 : 0, 0.06);
      cur.ty = lerp(cur.ty, inside ? clamp(0.5 - ny, -0.5, 0.5) * 7 : 0, 0.06);
      el.style.setProperty("--lx", `${cur.lx.toFixed(2)}%`);
      el.style.setProperty("--ly", `${cur.ly.toFixed(2)}%`);
      el.style.setProperty("--tx", `${cur.tx.toFixed(2)}px`);
      el.style.setProperty("--ty", `${cur.ty.toFixed(2)}px`);
    });
  }, []);

  return (
    <div ref={ref} className={cn("founder-card", className)}>
      <img
        src={pedroHome}
        alt="Pedro Demetrius, psicólogo e fundador da Zum"
        width={1080}
        height={1350}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
