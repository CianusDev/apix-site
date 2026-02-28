import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { getAllDocs } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Full documentation for apix — the terminal HTTP client.",
};

export default function DocsIndexPage() {
  const docs = getAllDocs();

  return (
    <div className="py-10 pl-0 pr-0 lg:pl-8">
      <h1 className="mb-2 font-mono text-3xl font-bold text-foreground">
        Documentation
      </h1>
      <p className="mb-10 text-muted-foreground">
        Everything you need to use and contribute to apix.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${doc.slug}` as Route}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <h2 className="mb-1 font-semibold text-foreground transition-colors group-hover:text-primary">
              {doc.title}
            </h2>
            <p className="text-sm text-muted-foreground">{doc.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
