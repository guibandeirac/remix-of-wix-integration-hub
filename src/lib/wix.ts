import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { ApiKeyStrategy, createClient, media, OAuthStrategy } from "@wix/sdk";
import { posts } from "@wix/blog";

import { contacts, labels, notes } from "@wix/crm";
import { z } from "zod";

import type { RichNode } from "@/components/rich-content";

// Everything below runs on the server only: credentials come from process.env
// and are never sent to the browser.

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

// Visitor client (public data such as blog posts). Reused so visitor tokens are
// generated once and refreshed by the SDK instead of on every request.
let visitorClient: ReturnType<typeof createVisitorClient> | undefined;

function createVisitorClient() {
  return createClient({
    modules: { posts },
    auth: OAuthStrategy({ clientId: requireEnv("WIX_CLIENT_ID") }),
  });
}

function getVisitorClient() {
  visitorClient ??= createVisitorClient();
  return visitorClient;
}

// Admin client (writes to the CRM). Needs an API key with "Manage Contacts" permission.
function getAdminClient() {
  return createClient({
    modules: { contacts, labels, notes },
    auth: ApiKeyStrategy({
      apiKey: requireEnv("WIX_API_KEY"),
      siteId: requireEnv("WIX_SITE_ID"),
    }),
  });
}

export const checkWixConnection = createServerFn({ method: "GET" }).handler(async () => {
  const tokens = await getVisitorClient().auth.generateVisitorTokens();
  return { connected: Boolean(tokens.accessToken?.value) };
});

// ---------- Blog ----------

export type ArticleSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  minutesToRead: number;
  coverUrl: string | null;
};

export type Article = ArticleSummary & {
  content: RichNode[];
};

async function fetchPostBySlug(slug: string) {
  return getVisitorClient().posts.getPostBySlug(slug);
}

type WixPost = NonNullable<Awaited<ReturnType<typeof fetchPostBySlug>>["post"]>;

function coverUrl(post: WixPost, width: number, height: number) {
  const image = post.media?.wixMedia?.image;
  if (!image || post.media?.displayed === false) return null;
  return media.getScaledToFillImageUrl(image, width, height, {});
}

function toSummary(post: WixPost): ArticleSummary {
  return {
    id: post._id ?? post.slug ?? "",
    slug: post.slug ?? "",
    title: post.title ?? "",
    excerpt: post.excerpt ?? "",
    publishedAt: post.firstPublishedDate ? new Date(post.firstPublishedDate).toISOString() : null,
    minutesToRead: post.minutesToRead ?? 0,
    coverUrl: coverUrl(post, 1200, 800),
  };
}

export const listArticles = createServerFn({ method: "GET" }).handler(
  async (): Promise<ArticleSummary[]> => {
    const { posts: items } = await getVisitorClient().posts.listPosts({
      paging: { limit: 100 },
      sort: "PUBLISHED_DATE_DESC",
    });
    return (items ?? []).map(toSummary);
  },
);

export const getArticle = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => z.string().min(1).parse(slug))
  .handler(async ({ data: slug }): Promise<Article> => {
    const { post } = await getVisitorClient()
      .posts.getPostBySlug(slug, { fieldsets: ["RICH_CONTENT"] })
      .catch(() => ({ post: undefined }));
    if (!post) throw notFound();

    return {
      ...toSummary(post),
      coverUrl: coverUrl(post, 1600, 900),
      content: (post.richContent?.nodes ?? []) as RichNode[],
    };
  });

// ---------- Leads ----------

const LEAD_LABEL = "Lead - Site";

const leadSchema = z.object({
  nome: z.string().trim().min(1).max(200),
  empresa: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  telefone: z.string().trim().max(40).optional().default(""),
  desafio: z.string().trim().min(1).max(5000),
});

export type LeadInput = z.input<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: LeadInput) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const wix = getAdminClient();
    const { label } = await wix.labels.findOrCreateLabel(LEAD_LABEL);
    const labelKey = label?.key;
    if (!labelKey) throw new Error("Não foi possível preparar a etiqueta de lead no CRM");

    // Reuse the existing contact when this e-mail already exists in the CRM.
    const existing = await wix.contacts
      .queryContacts()
      .eq("primaryInfo.email", data.email)
      .limit(1)
      .find();

    let contactId = existing.items[0]?._id;

    if (contactId) {
      await wix.contacts.labelContact(contactId, [labelKey]);
    } else {
      const [first, ...rest] = data.nome.split(/\s+/);
      const { contact } = await wix.contacts.createContact({
        name: { first: first ?? null, last: rest.join(" ") || null },
        company: data.empresa,
        emails: { items: [{ email: data.email, tag: "MAIN" }] },
        ...(data.telefone ? { phones: { items: [{ phone: data.telefone, tag: "MOBILE" }] } } : {}),
        labelKeys: { items: [labelKey] },
      });
      if (!contact) throw new Error("Não foi possível registrar o contato no CRM");
      contactId = contact._id!;
    }

    await wix.notes.createNote({
      contactId,
      text: [
        "Formulário de contato do site",
        `Empresa: ${data.empresa}`,
        `Telefone: ${data.telefone || "-"}`,
        "",
        "Desafio:",
        data.desafio,
      ].join("\n"),
    });

    return { ok: true as const };
  });
