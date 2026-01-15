/**
 * @file Generate a table of contents (TOC) from raw MDX.
 * This runs on the server side (uses unified parser only, no DOM).
 */

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import slugify from "slugify";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function createHeadingIdGenerator() {
  const counts = new Map<string, number>();

  return (text: string) => {
    const base = slugify(text, { lower: true, strict: true }) || "section";
    const current = counts.get(base) ?? 0;
    counts.set(base, current + 1);
    return current === 0 ? base : `${base}-${current}`;
  };
}

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
  const tree = unified()
    .use(remarkParse)
    // Support math blocks to avoid MDX expression parse errors.
    .use(remarkMath)
    .use(remarkMdx)
    .parse(mdxSource);

  const toc: TocItem[] = [];
  const generateId = createHeadingIdGenerator();

  // Walk the AST and capture heading nodes.
  visit(tree, "heading", (node: any) => {
    const level = node.depth;
    const text = extractHeadingText(node);
    if (!text) return;

    // Generate ids that stay stable while avoiding duplicates.
    const id = generateId(text);

    toc.push({ id, text, level });
  });

  return toc;
}
