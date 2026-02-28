import {
  Braces,
  Clock,
  FolderOpen,
  Globe,
  Layers,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Globe,
    title: "Full HTTP support",
    description:
      "GET, POST, PUT, PATCH, DELETE — persistent URL bar with a color-coded method badge.",
  },
  {
    icon: Layers,
    title: "Environments",
    description:
      "Define variables like {{base_url}} and switch between dev and prod in one keystroke.",
  },
  {
    icon: FolderOpen,
    title: "Collections",
    description:
      "Save any request to a named collection and reload it instantly from the drawer.",
  },
  {
    icon: Clock,
    title: "History",
    description:
      "Every request is logged. Full-text search with / to find any past call in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Authentication",
    description:
      "Bearer token, Basic Auth and API Key — configured once, applied automatically.",
  },
  {
    icon: Braces,
    title: "Body editor",
    description:
      "Multi-line editor with auto-indent, JSON auto-format on Ctrl+f and clipboard copy.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h2 className="mb-2 text-center font-mono text-sm uppercase tracking-widest text-primary">
        Features
      </h2>
      <p className="mb-12 text-center text-2xl font-semibold text-foreground">
        Everything you need, nothing you don&apos;t.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <Icon size={18} className="text-primary" />
              </div>
              <h3 className="mb-1.5 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
