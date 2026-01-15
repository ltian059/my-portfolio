import Link from "next/link";
import { getBaseUrl } from "@/lib/api/base-url";
import { notesPage } from "@/data/pages/notes/page";
import type { NoteMeta } from "@/lib/notes/reader";

export const metadata = {
  title: notesPage.title,
  description: notesPage.description,
};

export default async function NotesPage() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/notes`, { cache: "no-store" });
  const data = await res.json();
  const sortedNotes = (data.notes ?? []) as NoteMeta[];

  
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {notesPage.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {notesPage.description}
        </p>
      </header>

      <ul className="mt-10 space-y-4">
        {sortedNotes.map((note) => (
          <li
            id={note.slug}
            key={note.slug}
            className="rounded-2xl border border-black/[.08] p-5 dark:border-white/[.145]"
          >
            {note.coverImage ? (
              <img
                src={note.coverImage}
                alt={note.title}
                className="mb-4 h-auto w-full rounded-xl"
                loading="lazy"
                decoding="async"
              />
            ) : null}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Link
                href={`${notesPage.listHref}/${note.slug}`}
                className="text-lg font-medium text-zinc-950 hover:underline dark:text-zinc-50"
              >
                {note.title}
              </Link>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {note.date}
              </span>
            </div>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {note.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/[.04] px-3 py-1 text-xs text-zinc-700 dark:bg-white/[.08] dark:text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
