import Link from "next/link";
import type { Route } from "next";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p className="font-mono">
          <span className="text-primary">›</span> apix — MIT License
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/CianusDev/apix"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://github.com/CianusDev/apix/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Releases
          </a>
          <Link href={"/contributing" as Route} className="transition-colors hover:text-foreground">
            Contributing
          </Link>
        </div>

        <p className="font-mono text-xs">Built with Rust 🦀</p>
      </div>
    </footer>
  );
}
