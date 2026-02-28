import Link from "next/link";
import type { Route } from "next";
import { Github } from "lucide-react";

const navLinks: { href: Route; label: string }[] = [
  { href: "/docs" as Route, label: "Docs" },
  { href: "/install" as Route, label: "Install" },
  { href: "/contributing" as Route, label: "Contributing" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-tight text-foreground"
        >
          <span className="text-primary">›</span> apix
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://github.com/CianusDev/apix"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="ml-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={18} />
          </a>
        </nav>
      </div>
    </header>
  );
}
