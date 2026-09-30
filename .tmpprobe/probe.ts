import { posts } from "@wix/blog";
type A = Awaited<ReturnType<(typeof posts)["getPostBySlug"]>>;
type B = NonNullable<A["post"]>;
declare const b: B;
const x: string | undefined = b.slug;
export { x };
