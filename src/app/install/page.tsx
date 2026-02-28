import type { Metadata } from "next";
import { InstallCommand } from "@/components/ui/install-command";
import { BinariesTable } from "@/features/install/components/binaries-table";
import { OsTabs } from "@/features/install/components/os-tabs";
import { BuildFromSource } from "@/features/install/components/build-from-source";

export const metadata: Metadata = {
  title: "Install",
  description:
    "Install apix on Linux, macOS or Windows. One command is all it takes.",
};

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
          {number}
        </span>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="pl-10">{children}</div>
    </section>
  );
}

export default async function InstallPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* header */}
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
          Get started
        </p>
        <h1 className="mb-3 font-mono text-4xl font-bold text-foreground">
          Install apix
        </h1>
        <p className="text-muted-foreground">
          A single self-contained binary. No dependencies, no runtime.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {/* 1 — Quick install */}
        <Section number="1" title="Quick install (Linux & macOS)">
          <p className="mb-4 text-sm text-muted-foreground">
            The fastest way to get apix. Auto-detects your platform and installs
            to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              ~/.local/bin
            </code>
            .
          </p>
          <InstallCommand command="curl -fsSL https://raw.githubusercontent.com/CianusDev/apix/main/install.sh | bash" />
        </Section>

        {/* 2 — Manual download */}
        <Section number="2" title="Manual download">
          <p className="mb-4 text-sm text-muted-foreground">
            Download the binary for your platform from the{" "}
            <a
              href="https://github.com/CianusDev/apix/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Releases page
            </a>
            , then follow the steps below.
          </p>
          <BinariesTable />
          <div className="mt-6">
            <p className="mb-4 text-sm font-medium text-foreground">
              After downloading, extract and install:
            </p>
            <OsTabs />
          </div>
        </Section>

        {/* 3 — Build from source */}
        <Section number="3" title="Build from source">
          <BuildFromSource />
        </Section>
      </div>
    </div>
  );
}
