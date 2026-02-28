import { cn } from "@/lib/utils";
import type { DocHeading } from "@/lib/docs";

interface TocProps {
  headings: DocHeading[];
}

export function Toc({ headings }: TocProps) {
  if (headings.length === 0) return null;

  return (
    <aside className="hidden w-48 shrink-0 xl:block">
      <div className="sticky top-20 p-4">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          On this page
        </p>
        <nav className="flex flex-col gap-1">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                h.level === 3 && "pl-3",
              )}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
