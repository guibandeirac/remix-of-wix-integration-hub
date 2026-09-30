import { createFileRoute, redirect } from "@tanstack/react-router";

// Old Wix post URL (/post/<slug>) — keeps existing links and search results working.
export const Route = createFileRoute("/post/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/artigos/$slug", params: { slug: params.slug }, statusCode: 301 });
  },
});
