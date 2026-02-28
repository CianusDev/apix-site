import Link from "next/link";
import type { Route } from "next";
import { Github } from "lucide-react";

export function CtaSection() {
  return (
    <section className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
          Open source
        </p>
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Ready to ditch the GUI?
        </h2>
        <p className="mb-8 text-muted-foreground">
          apix is free, open-source and runs entirely in your terminal.
          <br />
          No accounts, no telemetry, no bloat.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/CianusDev/apix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Github size={16} />
            View on GitHub
          </a>
          <Link
            href={"/docs" as Route}
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Browse the docs →
          </Link>
        </div>
      </div>
    </section>
  );
}
