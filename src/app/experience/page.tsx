import {
  educationSection,
  experiencePage,
  projectsSection,
  publicationsSection,
  workSection,
} from "@/data/pages/experience";

export const metadata = {
  title: experiencePage.title,
  description: experiencePage.description,
};

export default function ExperiencePage() {
  const { intro } = experiencePage;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
          {intro.eyebrow}
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {experiencePage.title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {experiencePage.description}
          </p>
        </div>
        <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          {intro.summary}
        </p>
        <div className="rounded-2xl border border-emerald-600/15 bg-emerald-50/70 p-4 text-sm text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-100">
          {intro.callout}
        </div>
      </header>

      <section id={educationSection.id} className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            {educationSection.title}
          </h2>
          <p className="text-sm text-zinc-500">{educationSection.subtitle}</p>
        </div>
        <div className="mt-6 space-y-4">
          {educationSection.items.map((item) => (
            <div
              key={`${item.school}-${item.degree}`}
              className="rounded-2xl border border-black/[.08] bg-white/70 p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/[.08] bg-white/80 shadow-sm dark:border-white/[.15] dark:bg-white/[.06]">
                    <img
                      src={item.logoSrc}
                      alt={item.logoAlt}
                      className="h-10 w-10"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {item.school}
                    </p>
                    <p className="text-xs text-zinc-500">{item.location}</p>
                  </div>
                </div>
                <span className="text-sm text-zinc-500">{item.period}</span>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id={workSection.id} className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            {workSection.title}
          </h2>
          <p className="text-sm text-zinc-500">{workSection.subtitle}</p>
        </div>
        <div className="mt-6 space-y-4">
          {workSection.items.map((item) => (
            <div
              key={`${item.company}-${item.role}`}
              className="rounded-2xl border border-black/[.08] bg-white/70 p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/[.08] bg-white/80 shadow-sm dark:border-white/[.15] dark:bg-white/[.06]">
                    <img
                      src={item.logoSrc}
                      alt={item.logoAlt}
                      className="h-10 w-10"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {item.company}
                    </p>
                    <p className="text-xs text-zinc-500">{item.location}</p>
                  </div>
                </div>
                <span className="text-sm text-zinc-500">{item.period}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {item.summary}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              {item.stack?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-black/[.08] bg-white px-3 py-1 text-xs text-zinc-700 dark:border-white/[.15] dark:bg-white/[.06] dark:text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id={publicationsSection.id} className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            {publicationsSection.title}
          </h2>
          <p className="text-sm text-zinc-500">{publicationsSection.subtitle}</p>
        </div>
        <div className="mt-6 space-y-4">
          {publicationsSection.items.map((item) => (
            <div
              key={`${item.title}-${item.year}`}
              className="rounded-2xl border border-black/[.08] bg-white/70 p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                  {item.title}
                </h3>
                <span className="text-sm text-zinc-500">{item.year}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {item.venue}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {item.authors}
              </p>
              {item.note ? (
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {item.note}
                </p>
              ) : null}
              <details className="experience-expander mt-4 rounded-xl border border-black/[.08] bg-white/80 p-3 text-sm text-zinc-700 dark:border-white/[.15] dark:bg-white/[.06] dark:text-zinc-200">
                <summary className="experience-expander__summary flex cursor-pointer items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                  {publicationsSection.detailsLabel}
                  <span className="experience-expander__icon text-base text-emerald-600 dark:text-emerald-300">
                    <span
                      className="experience-expander__icon--closed"
                      aria-hidden="true"
                    >
                      +
                    </span>
                    <span
                      className="experience-expander__icon--open"
                      aria-hidden="true"
                    >
                      -
                    </span>
                  </span>
                </summary>
                <div className="mt-3 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                  <p>{item.details}</p>
                  {item.highlights?.length ? (
                    <ul className="list-disc space-y-1 pl-5">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </details>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-300"
                >
                  {publicationsSection.linkLabel}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id={projectsSection.id} className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            {projectsSection.title}
          </h2>
          <p className="text-sm text-zinc-500">{projectsSection.subtitle}</p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {projectsSection.items.map((project) => (
            <div
              key={project.name}
              className="rounded-2xl border border-black/[.08] bg-white/70 p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                  {project.name}
                </h3>
                <span className="text-sm text-zinc-500">{project.period}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {project.summary}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/[.08] bg-white px-3 py-1 text-xs text-zinc-700 dark:border-white/[.15] dark:bg-white/[.06] dark:text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-300"
                >
                  {projectsSection.linkLabel}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
