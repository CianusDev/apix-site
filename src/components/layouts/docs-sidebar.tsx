"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import type { DocMeta } from "@/lib/docs";

interface DocsSidebarProps {
  docs: DocMeta[];
}

export function DocsSidebar({ docs }: DocsSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-0.5">
      <p className="mb-2 px-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Documentation
      </p>
      {docs.map((doc) => {
        const href = `/docs/${doc.slug}` as Route;
        const isActive = pathname === href;
        return (
          <Link
            key={doc.slug}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {doc.title}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* mobile toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg lg:hidden"
        aria-label="Toggle navigation"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* mobile drawer */}
      <aside
        className={cn(
          "fixed bottom-0 left-0 top-14 z-40 w-64 border-r border-border bg-background p-4 transition-transform lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {nav}
      </aside>

      {/* desktop sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-20 p-4">{nav}</div>
      </aside>
    </>
  );
}
