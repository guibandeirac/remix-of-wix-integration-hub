import type { ReactNode } from "react";

// Minimal renderer for Wix Ricos rich content (blog posts). Wix colors and
// alignments are ignored on purpose so articles follow the site's own typography.

type Decoration = {
  type: string;
  linkData?: { link?: { url?: string; target?: string } };
};

export type RichNode = {
  type: string;
  id?: string;
  nodes?: RichNode[];
  textData?: { text?: string; decorations?: Decoration[] };
  headingData?: { level?: number };
  imageData?: {
    image?: { src?: { id?: string; url?: string }; width?: number; height?: number };
    altText?: string;
    caption?: string;
    link?: { url?: string };
  };
};

function wixImageUrl(src?: { id?: string; url?: string }) {
  if (src?.url) return src.url;
  if (src?.id) return `https://static.wixstatic.com/media/${src.id}`;
  return null;
}

function renderText(node: RichNode, key: number): ReactNode {
  let out: ReactNode = node.textData?.text ?? "";
  for (const d of node.textData?.decorations ?? []) {
    if (d.type === "BOLD") out = <strong className="font-semibold text-foreground">{out}</strong>;
    else if (d.type === "ITALIC") out = <em>{out}</em>;
    else if (d.type === "UNDERLINE") out = <u>{out}</u>;
    else if (d.type === "LINK" && d.linkData?.link?.url) {
      out = (
        <a
          href={d.linkData.link.url}
          target={d.linkData.link.target === "SELF" ? undefined : "_blank"}
          rel="noreferrer"
          className="text-primary underline underline-offset-4"
        >
          {out}
        </a>
      );
    }
  }
  return <span key={key}>{out}</span>;
}

function children(node: RichNode) {
  return (node.nodes ?? []).map((child, i) => renderNode(child, i));
}

function renderNode(node: RichNode, key: number): ReactNode {
  switch (node.type) {
    case "TEXT":
      return renderText(node, key);
    case "PARAGRAPH":
      // Wix uses empty paragraphs as spacers; the stylesheet already spaces blocks.
      if (!node.nodes?.some((n) => n.textData?.text?.trim())) return null;
      return <p key={key}>{children(node)}</p>;
    case "HEADING": {
      const level = Math.min(Math.max(node.headingData?.level ?? 2, 2), 4);
      const Tag = `h${level}` as "h2" | "h3" | "h4";
      return <Tag key={key}>{children(node)}</Tag>;
    }
    case "BULLETED_LIST":
      return <ul key={key}>{children(node)}</ul>;
    case "ORDERED_LIST":
      return <ol key={key}>{children(node)}</ol>;
    case "LIST_ITEM":
      return <li key={key}>{children(node)}</li>;
    case "BLOCKQUOTE":
      return <blockquote key={key}>{children(node)}</blockquote>;
    case "DIVIDER":
      return <hr key={key} />;
    case "IMAGE": {
      const url = wixImageUrl(node.imageData?.image?.src);
      if (!url) return null;
      return (
        <figure key={key}>
          <img
            src={url}
            alt={node.imageData?.altText ?? ""}
            width={node.imageData?.image?.width}
            height={node.imageData?.image?.height}
            loading="lazy"
          />
          {node.imageData?.caption && <figcaption>{node.imageData.caption}</figcaption>}
        </figure>
      );
    }
    default:
      // Unknown block (video, gallery, embed…): render its text children if any.
      return node.nodes?.length ? <div key={key}>{children(node)}</div> : null;
  }
}

export function RichContent({ nodes }: { nodes: RichNode[] }) {
  return <div className="article-body">{nodes.map((node, i) => renderNode(node, i))}</div>;
}
