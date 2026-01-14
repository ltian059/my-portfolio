import Link from "next/link";
import { getAllNotes } from "@/data/notes/reader";

export const metadata = {
  title: "Notes",
  description: "刷题笔记与学习记录",
};

export default function NotesPage() {
  const notes = getAllNotes();
  const sortedNotes = [...notes].sort((a, b) => {
    const aPriority = a.priority ?? -1;
    const bPriority = b.priority ?? -1;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Notes
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          这里放刷题笔记、学习记录和一些可复用的模板。
        </p>
      </header>

      <ul className="mt-10 space-y-4">
        {sortedNotes.map((note) => (
          <li
            id={note.slug}
            key={note.slug}
            className="rounded-2xl border border-black/[.08] p-5 dark:border-white/[.145]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Link
                href={`/notes/${note.slug}`}
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
