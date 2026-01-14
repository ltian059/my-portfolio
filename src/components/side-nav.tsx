export type SideNavItem = {
  label: string;
  href: string;
};

type SideNavProps = {
  title?: string;
  items: SideNavItem[];
  onCollapse?: () => void;
  showCollapse?: boolean;
  collapseLabel?: string;
  headerClassName?: string;
  className?: string;
  activeHref?: string;
  onItemClick?: (href: string) => void;
};

export default function SideNav({
  title = "On this page",
  items,
  onCollapse,
  showCollapse = false,
  collapseLabel = "<<",
  headerClassName = "flex items-center justify-between",
  className = "",
  activeHref,
  onItemClick,
}: SideNavProps) {
  return (
    <aside
      className={`shrink-0 border-r border-black/[.08] bg-white/70 px-4 py-6 text-sm text-zinc-600 dark:border-white/[.145] dark:bg-white/[.04] dark:text-zinc-300 ${className}`}
    >
      <div className={headerClassName}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {title}
        </p>
        {showCollapse ? (
          <button
            type="button"
            onClick={onCollapse}
            className="rounded-md px-2 py-1 text-xs text-zinc-500 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-white/[.06]"
            aria-label="Collapse sidebar"
          >
            {collapseLabel}
          </button>
        ) : null}
      </div>
      <nav className="mt-4 space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(event) => {
              if (!onItemClick) return;
              event.preventDefault();
              onItemClick(item.href);
            }}
            className={`block rounded-lg px-3 py-2 hover:bg-black/[.04] dark:hover:bg-white/[.06] ${
              activeHref === item.href
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"
                : ""
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
