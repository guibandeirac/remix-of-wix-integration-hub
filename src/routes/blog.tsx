import { createFileRoute, redirect } from "@tanstack/react-router";

// Old Wix URL — keeps existing links and search results working.
export const Route = createFileRoute("/blog")({
  beforeLoad: () => {
    throw redirect({ to: "/artigos", statusCode: 301 });
  },
});
