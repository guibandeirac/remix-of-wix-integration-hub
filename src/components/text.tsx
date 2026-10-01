import { useEffect, useRef, type ComponentProps } from "react";

// Justificação sutil, sem hifenização: o parágrafo nasce alinhado à esquerda e só
// passa a justificado quando nenhuma linha precisaria abrir os espaços entre as
// palavras além de um limite discreto. Em colunas estreitas, onde o justificado
// criaria "rios", o texto permanece alinhado à esquerda.

/** Aumento máximo aceitável por espaço entre palavras, em em. */
const MAX_EXTRA_GAP_EM = 0.24;
/** Parágrafos curtos ficam melhores alinhados à esquerda. */
const MIN_LINES = 3;

function shouldJustify(p: HTMLElement) {
  const style = getComputedStyle(p);
  const fontSize = parseFloat(style.fontSize) || 16;
  const box = p.getBoundingClientRect();
  const contentLeft = box.left + parseFloat(style.paddingLeft) + parseFloat(style.borderLeftWidth);
  const contentWidth =
    p.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  if (contentWidth <= 0) return false;

  // Agrupa as palavras por linha a partir da posição de cada uma.
  const lines = new Map<number, { right: number; words: number }>();
  const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.nodeValue ?? "";
    const re = /\S+/g;
    for (let m = re.exec(text); m; m = re.exec(text)) {
      range.setStart(node, m.index);
      range.setEnd(node, m.index + m[0].length);
      const rects = range.getClientRects();
      const last = rects[rects.length - 1];
      if (!last) continue;
      const key = Math.round(last.top);
      const line = lines.get(key) ?? { right: 0, words: 0 };
      line.right = Math.max(line.right, last.right);
      line.words += 1;
      lines.set(key, line);
    }
  }
  range.detach();

  const ordered = [...lines.entries()].sort((a, b) => a[0] - b[0]).map(([, l]) => l);
  if (ordered.length < MIN_LINES) return false;

  // A última linha nunca é esticada.
  for (const line of ordered.slice(0, -1)) {
    const gaps = line.words - 1;
    if (gaps < 1) return false;
    const slack = contentLeft + contentWidth - line.right;
    if (slack / gaps > MAX_EXTRA_GAP_EM * fontSize) return false;
  }
  return true;
}

/** Parágrafo com justificação adaptativa (ver comentário acima). */
export function P({ children, ...props }: ComponentProps<"p">) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    let frame = 0;
    let lastWidth = -1;

    const measure = () => {
      frame = 0;
      // Mede sempre a partir do alinhamento à esquerda.
      p.removeAttribute("data-justify");
      if (shouldJustify(p)) p.setAttribute("data-justify", "");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    void document.fonts?.ready.then(schedule);
    const ro = new ResizeObserver(([entry]) => {
      const width = Math.round(entry?.contentRect.width ?? 0);
      if (width !== lastWidth) {
        lastWidth = width;
        schedule();
      }
    });
    ro.observe(p);
    return () => {
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [children]);

  return (
    <p ref={ref} {...props}>
      {children}
    </p>
  );
}
