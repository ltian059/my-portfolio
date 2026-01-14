import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/data/notes/reader";
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) notFound();

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

      {/* <div className="mt-8 space-y-4 text-zinc-700 dark:text-zinc-200">
        {note.body.map((p, idx) => (
          <p key={idx} className="leading-8">
            {p}
          </p>
        ))}
      </div> */}
    </article>
  );
}
