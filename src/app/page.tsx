import Image from "next/image";
import Link from "next/link";
import { getBaseUrl } from "@/lib/api/base-url";
import { notesPage } from "@/data/pages/notes/page";
import type { NoteMeta } from "@/lib/notes/reader";
import type { HomeData } from "@/data/pages/home";

export default async function Home() {
  const baseUrl = await getBaseUrl();
  const [homeRes, notesRes] = await Promise.all([
    fetch(`${baseUrl}/api/home`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/notes`, { cache: "no-store" }),
  ]);

  const homeData = (await homeRes.json()) as HomeData;
  // Type notes payload for safe mapping in the UI.
  const notesData = (await notesRes.json()) as { notes: NoteMeta[] };

  const {
    hero,
    stats,
    resumeSection,
    resumeHighlights,
    techSection,
    techStack,
    focusNote,
    projectsSection,
    featuredProjects,
    notesSection,
  } = homeData;

  const featuredNotes = (notesData.notes ?? []).slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.18),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(14,116,144,0.18),transparent_60%)] blur-3xl" />

      <main className="relative mx-auto w-full max-w-5xl px-6 py-16">

        {/* #####################  Hero Section Avatar #######################*/}
        <section id={hero.id} className="grid gap-10 md:grid-cols-[220px,1fr] md:items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-black/[.08] bg-gradient-to-br from-emerald-100 via-white to-sky-100 dark:border-white/[.145] dark:from-emerald-500/20 dark:via-black/40 dark:to-sky-500/20">
              <Image
                src={hero.avatarSrc}
                alt={hero.avatarAlt}
                fill
                className="object-cover"
                sizes="400px"
                priority
              />
            </div>
          </div>
          {/* ##################### Hero Section text and Buttons #######################*/}
          <div className="space-y-6 text-center">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                {hero.tagline}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
                Hello, I am {hero.name}
              </h1>
              <p className="text-left text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                {hero.summary}
              </p>
            </div>
            {/* Resume Button */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={hero.resumeHref}
                download={hero.resumeDownloadName}
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {hero.resumeLabel}
              </a>
              {/* Notes Button */}
              <Link
                href={hero.notesHref}
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/[.08] px-5 text-sm font-medium text-zinc-950 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-white/[.08]"
              >
                {hero.notesLabel}
              </Link>
              {/* Github Button */}
          
              {/* Experience Button */}
              <Link
                href={hero.experienceHref}
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/[.08] px-5 text-sm font-medium text-zinc-950 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-400/10"
              >
                {hero.experienceLabel}
              </Link>

            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-300">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ##################### Resume Highlights ########################### */}
        <section id={resumeSection.id} className="mt-16 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-black/[.08] bg-white/70 p-6 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                {resumeSection.title}
              </h2>
              <Link
                href={resumeSection.linkHref}
                className="text-sm text-emerald-700 hover:underline dark:text-emerald-300"
              >
                {resumeSection.linkLabel}
              </Link>
            </div>
            <div className="mt-6 space-y-6">
              {resumeHighlights.map((item) => (
                <div
                  key={`${item.role}-${item.period}`}
                  className="rounded-2xl border border-black/[.06] p-5 dark:border-white/[.1]"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                      {item.role}
                    </h3>
                    <span className="text-sm text-zinc-500">{item.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {item.summary}
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ########################### Tech Stack ########################### */}
        <section id={techSection.id} className="mt-16 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-black/[.08] bg-white/70 p-6 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {techSection.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              {techSection.subtitle}
            </p>
            <div className="mt-5 space-y-4">
              {techStack.map((group) => (
                <div key={group.label} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/[.08] bg-white px-3 py-1 text-xs text-zinc-700 dark:border-white/[.15] dark:bg-white/[.06] dark:text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-emerald-600/15 bg-emerald-50/70 p-4 text-sm text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-100">
              {focusNote}
            </div>
          </div>
        </section>

        {/* ########################### Projects ########################### */}
        <section id={projectsSection.id} className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {projectsSection.title}
            </h2>
            <p className="text-sm text-zinc-500">{projectsSection.subtitle}</p>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.name}
                className="rounded-2xl border border-black/[.08] bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-md dark:border-white/[.145] dark:bg-white/[.04]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                  {project.tag}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {project.detail}
                </p>
                <p className="mt-4 text-xs text-zinc-500">
                  {project.hint}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ########################### Featured Notes ########################### */}
        <section id={notesSection.id} className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {notesSection.title}
            </h2>
            <Link
              href={notesSection.linkHref}
              className="text-sm text-emerald-700 hover:underline dark:text-emerald-300"
            >
              {notesSection.linkLabel}
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {featuredNotes.map((note) => (
              <article
                key={note.slug}
                className="overflow-hidden rounded-2xl border border-black/[.08] bg-white/70 shadow-sm transition hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-md dark:border-white/[.145] dark:bg-white/[.04]"
              >
                {note.coverImage ? (
                  <div className="relative h-36 w-full">
                    <Image
                      src={note.coverImage}
                      alt={note.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                ) : null}
                <div className="space-y-3 p-5">
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-black/[.04] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-zinc-700 dark:bg-white/[.08] dark:text-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    {note.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {note.summary}
                  </p>
                  <Link
                    href={`${notesPage.listHref}/${note.slug}`}
                    className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-300"
                  >
                    Read note →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
