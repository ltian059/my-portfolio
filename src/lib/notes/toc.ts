/**
 * @file Generate a table of contents (TOC) from raw MDX.
 * This runs on the server side (uses unified parser only, no DOM).
 */

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import slugify from "slugify";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

function extractHeadingText(node: any): string {
  // Collect plain text and inline code inside a heading.
  const parts: string[] = [];
  for (const child of node.children ?? []) {
    if (child.type === "text" || child.type === "inlineCode") {
      parts.push(child.value);
    }
  }
  return parts.join("").trim();
}

export function generateToc(mdxSource: string): TocItem[] {
  // Parse MDX into an AST so we can inspect headings.
  const tree = unified().use(remarkParse).use(remarkMdx).parse(mdxSource);

  const toc: TocItem[] = [];

  // Walk the AST and capture heading nodes.
  visit(tree, "heading", (node: any) => {
    const level = node.depth;
    const text = extractHeadingText(node);
    if (!text) return;

    // Create a stable, URL-friendly id for anchor links.
    const id = slugify(text, { lower: true, strict: true });

    toc.push({ id, text, level });
  });

  return toc;
}
