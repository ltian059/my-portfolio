export const metadata = {
  title: "Experience",
  description: "经验总结与复盘",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Experience
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          这里可以写面试复盘、项目踩坑、学习路线、效率工具等内容。
        </p>
      </header>

      <section className="mt-10 space-y-4">
        <div className="rounded-2xl border border-black/[.08] p-5 dark:border-white/[.145]">
          <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
            写作建议（以后扩展成列表页）
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-200">
            <li>一句话结论放最前面（让读者 5 秒内知道值不值得看）。</li>
            <li>用“背景 → 过程 → 结果 → 复盘”结构组织内容。</li>
            <li>每篇文章最后留一个“下一步行动”。</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

