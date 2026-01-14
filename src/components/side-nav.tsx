import Link from "next/link";

export type SideNavItem = {
  label: string;
  href: string;
};

type SideNavProps = {
  title?: string;
  items: SideNavItem[];
};

export default function SideNav({ title = "On this page", items }: SideNavProps) {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-black/[.08] bg-white/70 px-4 py-6 text-sm text-zinc-600 dark:border-white/[.145] dark:bg-white/[.04] dark:text-zinc-300 md:block">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
        {title}
      </p>
      <nav className="mt-4 space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 hover:bg-black/[.04] dark:hover:bg-white/[.06]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
