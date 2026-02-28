import { InstallCommand } from "@/components/ui/install-command";

export function InstallSection() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Quick install — Linux & macOS
        </p>
        <InstallCommand command="curl -fsSL https://raw.githubusercontent.com/CianusDev/apix/main/install.sh | bash" />
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Auto-detects your platform and installs the binary to{" "}
          <code className="font-mono text-foreground">~/.local/bin</code>
        </p>
      </div>
    </section>
  );
}
