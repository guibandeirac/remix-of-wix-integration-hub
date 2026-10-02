import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { ApiKeyStrategy, createClient, media, OAuthStrategy } from "@wix/sdk";
import { categories, posts } from "@wix/blog";

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
    modules: { posts, categories },
    auth: OAuthStrategy({ clientId: requireEnv("WIX_CLIENT_ID") }),
  });
}

function getVisitorClient() {
  visitorClient ??= createVisitorClient();
  return visitorClient;
}

// The blog degrades gracefully when Wix is not configured yet: the site stays
// browsable (empty article list / 404 per article) instead of crashing.
function isWixConfigured() {
  return Boolean(process.env["WIX_CLIENT_ID"]);
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

export type ArticleCategory = {
  /** Usado no endereço: /artigos?tema=lideranca */
  slug: string;
  label: string;
  description: string;
};

export type ArticleSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  minutesToRead: number;
  coverUrl: string | null;
  category: ArticleCategory | null;
  /** Marcado como destaque no Wix: compõe o "Comece por aqui". */
  featured: boolean;
};

export type Article = ArticleSummary & {
  content: RichNode[];
  /** Outros artigos do mesmo tema. */
  related: ArticleSummary[];
};

const slugify = (label: string) =>
  label
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Categorias mudam raramente: ficam em memória por alguns minutos.
let categoryCache: { at: number; map: Map<string, ArticleCategory> } | undefined;

async function getCategoryMap() {
  if (categoryCache && Date.now() - categoryCache.at < 5 * 60_000) return categoryCache.map;
  const map = new Map<string, ArticleCategory>();
  try {
    const { categories: items = [] } = await getVisitorClient().categories.listCategories({
      paging: { limit: 100 },
    });
    for (const cat of items) {
      if (!cat._id || !cat.label) continue;
      map.set(cat._id, {
        slug: slugify(cat.label),
        label: cat.label,
        description: cat.description ?? "",
      });
    }
    categoryCache = { at: Date.now(), map };
  } catch {
    // Sem categorias, os artigos continuam aparecendo normalmente.
  }
  return map;
}

async function fetchPostBySlug(slug: string) {
  return getVisitorClient().posts.getPostBySlug(slug);
}

type WixPost = NonNullable<Awaited<ReturnType<typeof fetchPostBySlug>>["post"]>;

function coverUrl(post: WixPost, width: number, height: number) {
  const image = post.media?.wixMedia?.image;
  if (!image || post.media?.displayed === false) return null;
  return media.getScaledToFillImageUrl(image, width, height, {});
}

function toSummary(post: WixPost, cats: Map<string, ArticleCategory>): ArticleSummary {
  const categoryId = post.categoryIds?.find((id) => cats.has(id));
  return {
    id: post._id ?? post.slug ?? "",
    slug: post.slug ?? "",
    title: post.title ?? "",
    excerpt: post.excerpt ?? "",
    publishedAt: post.firstPublishedDate ? new Date(post.firstPublishedDate).toISOString() : null,
    minutesToRead: post.minutesToRead ?? 0,
    coverUrl: coverUrl(post, 1200, 800),
    category: categoryId ? (cats.get(categoryId) ?? null) : null,
    featured: Boolean(post.featured),
  };
}

async function fetchSummaries(): Promise<ArticleSummary[]> {
  const [{ posts: items }, cats] = await Promise.all([
    getVisitorClient().posts.listPosts({ paging: { limit: 100 }, sort: "PUBLISHED_DATE_DESC" }),
    getCategoryMap(),
  ]);
  return (items ?? []).map((post) => toSummary(post, cats));
}

export const listArticles = createServerFn({ method: "GET" }).handler(
  async (): Promise<ArticleSummary[]> => {
    if (!isWixConfigured()) return [];
    try {
      return await fetchSummaries();
    } catch {
      return [];
    }
  },
);

export const getArticle = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => z.string().min(1).parse(slug))
  .handler(async ({ data: slug }): Promise<Article> => {
    if (!isWixConfigured()) throw notFound();

    let post: WixPost | undefined;
    try {
      const result = await getVisitorClient().posts.getPostBySlug(slug, {
        fieldsets: ["RICH_CONTENT"],
      });
      post = result.post;
    } catch {
      throw notFound();
    }
    if (!post) throw notFound();

    const summary = toSummary(post, await getCategoryMap());
    let related: ArticleSummary[] = [];
    try {
      const all = (await fetchSummaries()).filter((a) => a.id !== summary.id);
      const sameTheme = all.filter((a) => a.category?.slug === summary.category?.slug);
      // Completa com os mais recentes quando o tema tem poucos artigos.
      related = [...sameTheme, ...all.filter((a) => !sameTheme.includes(a))].slice(0, 3);
    } catch {
      // As leituras relacionadas são opcionais.
    }

    return {
      ...summary,
      coverUrl: coverUrl(post, 1600, 900),
      content: (post.richContent?.nodes ?? []) as RichNode[],
      related,
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
