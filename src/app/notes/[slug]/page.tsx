import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import slugify from "slugify";
import { visit } from "unist-util-visit";
import type { Root } from "hast";
type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getBaseUrl() {
  const headerList = await headers();
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const host =
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    "localhost:3000";
  return `${protocol}://${host}`;
}

function rehypeSlugifyHeadings() {
  return (tree: Root) => {
    visit(tree, "element", (node: any) => {
      if (!node.tagName || !/^h[1-6]$/.test(node.tagName)) return;
      const text = node.children
        ?.filter((child: any) => child.type === "text")
        .map((child: any) => child.value)
        .join("")
        .trim();
      if (!text) return;
      node.properties = node.properties ?? {};
      if (!node.properties.id) {
        node.properties.id = slugify(text, { lower: true, strict: true });
      }
    });
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const baseUrl = await getBaseUrl();
  const encodedSlug = encodeURIComponent(slug);
  const res = await fetch(`${baseUrl}/api/notes/${encodedSlug}`, {
    cache: "no-store",
  });
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to load note: ${slug}`);
  }

  const data = await res.json();
  const note = data.note;

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/notes"
          className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
        >
          ← Back to Notes
        </Link>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {note.meta.date}
        </span>
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {note.meta.title}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {note.meta.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-black/[.04] px-3 py-1 text-xs text-zinc-700 dark:bg-white/[.08] dark:text-zinc-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 space-y-6 text-zinc-700 dark:text-zinc-200">
        <MDXRemote
          source={note.body}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlugifyHeadings,
                [
                  rehypePrettyCode,
                  {
                    theme: {
                      dark: "github-dark",
                      light: "github-light",
                    },
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
