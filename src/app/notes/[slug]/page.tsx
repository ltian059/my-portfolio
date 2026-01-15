import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import slugify from "slugify";
import { visit } from "unist-util-visit";
import type { Root } from "hast";
import TocNav from "@/components/toc-nav";
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
      // Keep the slugging logic aligned with TOC generation.
      const text = node.children
        ?.filter(
          (child: any) => child.type === "text" || child.type === "inlineCode"
        )
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
  // Fetch note content and the list of notes for the left sidebar.
  const [noteRes, notesRes] = await Promise.all([
    fetch(`${baseUrl}/api/notes/${encodedSlug}`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/notes`, { cache: "no-store" }),
  ]);

  if (noteRes.status === 404) {
    notFound();
  }

  if (!noteRes.ok) {
    throw new Error(`Failed to load note: ${slug}`);
  }

  const noteData = await noteRes.json();
  const notesData = await notesRes.json();
  const note = noteData.note;
  const toc = noteData.toc ?? [];
  const notes = notesData.notes ?? [];

  return (
    <div className="mx-auto w-full max-w-[88rem] px-4 py-16">
      {/* Use a three-column grid to keep content centered while pushing sidebars outward. */}
      <div className="grid gap-10 xl:grid-cols-[20rem_minmax(0,1fr)_20rem] lg:grid-cols-[20rem_minmax(0,1fr)]">
      {/* Left sidebar: Notes list, always visible on larger screens. */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-black/[.08] bg-white/70 px-4 py-6 text-sm text-zinc-600 dark:border-white/[.145] dark:bg-white/[.04] dark:text-zinc-300">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Notes
          </p>
          <nav className="mt-4 space-y-2">
            {notes.map((item: { slug: string; title: string }) => {
              const href = `/notes/${item.slug}`;
              const isActive = item.slug === note.meta.slug;
              return (
                <Link
                  key={item.slug}
                  href={href}
                  className={`block rounded-lg px-3 py-2 transition hover:bg-black/[.04] dark:hover:bg-white/[.06] ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"
                      : ""
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content: MDX body, centered within the middle column. */}
      <article className="min-w-0 w-full max-w-4xl justify-self-center">
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
          {note.meta.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-black/[.04] px-3 py-1 text-xs text-zinc-700 dark:bg-white/[.08] dark:text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="note-content mt-8 space-y-6 text-zinc-700 dark:text-zinc-200">
          <MDXRemote
            source={note.body}
            options={{
              mdxOptions: {
                // Enable math first, then add GFM features (tables, task lists, etc.).
                remarkPlugins: [remarkMath, remarkGfm],
                rehypePlugins: [
                  rehypeSlugifyHeadings,
                  // Render inline/block math with KaTeX.
                  rehypeKatex,
                  // Render fenced code blocks with consistent themes.
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

      {/* Right sidebar: TOC for the current note, with scroll-synced highlight. */}
      <aside className="hidden xl:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-black/[.08] bg-white/70 px-4 py-6 text-sm text-zinc-600 dark:border-white/[.145] dark:bg-white/[.04] dark:text-zinc-300">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            On this page
          </p>
          <div className="mt-4">
            <TocNav items={toc} />
          </div>
        </div>
      </aside>
      </div>
    </div>
  );
}
