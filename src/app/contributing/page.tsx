import type { Metadata } from "next";
import { Github, GitPullRequest } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata: Metadata = {
  title: "Contributing",
  description:
    "Learn how to contribute to apix — the terminal HTTP client written in Rust.",
};

const WORKFLOW_STEPS = [
  {
    label: "Fork the repository on GitHub",
    command: null,
  },
  {
    label: "Clone your fork",
    command: "git clone https://github.com/<your-username>/apix.git && cd apix",
  },
  {
    label: "Create a feature branch",
    command: "git checkout -b feature/my-feature",
  },
  {
    label: "Make your changes, then run the checks",
    command: null,
  },
  {
    label: "Commit and push",
    command: "git add -p && git commit -m 'feat: my feature' && git push origin feature/my-feature",
  },
  {
    label: "Open a Pull Request against CianusDev/apix",
    command: null,
  },
];

const MIT_LICENSE = `MIT License

Copyright (c) 2024 CianusDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default async function ContributingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* header */}
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
          Open source
        </p>
        <h1 className="mb-3 font-mono text-4xl font-bold text-foreground">
          Contributing
        </h1>
        <p className="text-muted-foreground">
          apix is open source and pull requests are welcome. Here is everything
          you need to get started.
        </p>
      </div>

      <div className="flex flex-col gap-14">
        {/* workflow */}
        <section>
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            Workflow
          </h2>
          <ol className="flex flex-col gap-5">
            {WORKFLOW_STEPS.map((step, i) => (
              <li key={i} className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{step.label}</span>
                </div>
                {step.command && (
                  <div className="pl-9">
                    <CodeBlock code={step.command} lang="bash" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* dev commands */}
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Development commands
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Run these before opening a PR to make sure everything passes.
          </p>
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Run all tests</p>
              <CodeBlock code="cargo test" lang="bash" />
            </div>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Lint with Clippy</p>
              <CodeBlock code="cargo clippy -- -D warnings" lang="bash" />
            </div>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Format the code</p>
              <CodeBlock code="cargo fmt" lang="bash" />
            </div>
          </div>
        </section>

        {/* github CTA */}
        <section className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <GitPullRequest size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="mb-1 font-semibold text-foreground">
                Pull requests welcome
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Bug fixes, features, documentation improvements — all
                contributions are appreciated.
              </p>
              <a
                href="https://github.com/CianusDev/apix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Github size={16} />
                Open on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* license */}
        <section>
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            License
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            apix is released under the{" "}
            <a
              href="https://github.com/CianusDev/apix/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              MIT License
            </a>
            . You are free to use, modify and distribute it.
          </p>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">
                LICENSE
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-muted-foreground">
              {MIT_LICENSE}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
