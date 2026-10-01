// Shared motion runtime for the interactive 3D elements: one pointer listener,
// one scroll listener and one requestAnimationFrame loop for every subscriber.

type Tick = (state: MotionState) => void;

export type MotionState = {
  /** Pointer position in viewport pixels. */
  x: number;
  y: number;
  /** Viewport size. */
  vw: number;
  vh: number;
  /** Smoothed scroll velocity in px/frame (positive = scrolling down). */
  scrollVelocity: number;
  /** True once the pointer has moved at least once (desktop) or touched (mobile). */
  hasPointer: boolean;
  time: number;
};

const subscribers = new Set<Tick>();
let frame = 0;
let started = false;
let lastScrollY = 0;

const state: MotionState = {
  x: 0,
  y: 0,
  vw: 1,
  vh: 1,
  scrollVelocity: 0,
  hasPointer: false,
  time: 0,
};

function loop(time: number) {
  const scrollY = window.scrollY;
  state.scrollVelocity += (scrollY - lastScrollY - state.scrollVelocity) * 0.18;
  lastScrollY = scrollY;
  state.time = time;
  for (const tick of subscribers) tick(state);
  frame = subscribers.size ? requestAnimationFrame(loop) : 0;
}

function start() {
  if (!started) {
    started = true;
    state.vw = window.innerWidth;
    state.vh = window.innerHeight;
    state.x = state.vw / 2;
    state.y = state.vh / 2;
    lastScrollY = window.scrollY;
    window.addEventListener(
      "pointermove",
      (e) => {
        state.x = e.clientX;
        state.y = e.clientY;
        state.hasPointer = true;
      },
      { passive: true },
    );
    window.addEventListener(
      "resize",
      () => {
        state.vw = window.innerWidth;
        state.vh = window.innerHeight;
      },
      { passive: true },
    );
  }
  if (!frame) frame = requestAnimationFrame(loop);
}

/** Runs `tick` on every animation frame while subscribed. Returns an unsubscribe function. */
export function subscribeFrame(tick: Tick) {
  subscribers.add(tick);
  start();
  return () => {
    subscribers.delete(tick);
  };
}

/** Subscribes `tick` only while `el` is near the viewport. */
export function subscribeWhileVisible(el: Element, tick: Tick) {
  let unsubscribe: (() => void) | null = null;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        unsubscribe ??= subscribeFrame(tick);
      } else {
        unsubscribe?.();
        unsubscribe = null;
      }
    },
    { rootMargin: "20% 0px" },
  );
  io.observe(el);
  return () => {
    io.disconnect();
    unsubscribe?.();
  };
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
