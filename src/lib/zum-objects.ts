import arrow from "@/assets/objects/arrow.webp";
import coil from "@/assets/objects/coil.webp";
import cross from "@/assets/objects/cross.webp";
import hourglass from "@/assets/objects/hourglass.webp";
import orbit from "@/assets/objects/orbit.webp";
import sphere from "@/assets/objects/sphere.webp";
import spring from "@/assets/objects/spring.webp";
import stack from "@/assets/objects/stack.webp";

// Elementos 3D da marca (PNG sem fundo, exportados em WebP).
export const zumObjects = { arrow, coil, cross, hourglass, orbit, sphere, spring, stack } as const;
export type ZumObjectName = keyof typeof zumObjects;
