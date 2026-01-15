import { experiencePage } from "@/data/pages/experience/page";

export const metadata = {
  title: experiencePage.title,
  description: experiencePage.description,
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {experiencePage.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {experiencePage.description}
        </p>
      </header>

      <section className="mt-10 space-y-4">
        <div className="rounded-2xl border border-black/[.08] p-5 dark:border-white/[.145]">
          <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
            {experiencePage.tipsTitle}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-200">
            {experiencePage.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
