import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <main className="space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            你好，我是（你的名字）
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            这里是我的个人主页，会持续更新刷题笔记、学习记录和经验复盘。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/notes"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              去看 Notes
            </Link>
            <Link
              href="/experience"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/[.08] px-5 text-sm font-medium text-zinc-950 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-white/[.08]"
            >
              去看 Experience
            </Link>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/notes"
            className="rounded-2xl border border-black/[.08] p-6 hover:bg-black/[.02] dark:border-white/[.145] dark:hover:bg-white/[.05]"
          >
            <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
              刷题笔记
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              LeetCode/算法题的思路整理、模板与易错点。
            </p>
          </Link>
          <Link
            href="/experience"
            className="rounded-2xl border border-black/[.08] p-6 hover:bg-black/[.02] dark:border-white/[.145] dark:hover:bg-white/[.05]"
          >
            <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
              经验复盘
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              面试/项目/学习的复盘与总结，持续迭代。
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
