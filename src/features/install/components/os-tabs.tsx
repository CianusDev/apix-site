"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { InstallCommand } from "@/components/ui/install-command";

type OS = "linux" | "macos" | "windows";

const TABS: { id: OS; label: string }[] = [
  { id: "linux", label: "Linux" },
  { id: "macos", label: "macOS" },
  { id: "windows", label: "Windows" },
];

const CONTENT: Record<
  OS,
  { steps: { label: string; command: string }[]; note?: string }
> = {
  linux: {
    steps: [
      {
        label: "Extract the archive",
        command: "tar xzf apix-*-x86_64-unknown-linux-gnu.tar.gz",
      },
      {
        label: "Move to your PATH",
        command: "mv apix ~/.local/bin/",
      },
      {
        label: "Verify",
        command: "apix --version",
      },
    ],
  },
  macos: {
    steps: [
      {
        label: "Extract the archive (Intel or Apple Silicon)",
        command: "tar xzf apix-*-apple-darwin.tar.gz",
      },
      {
        label: "Move to your PATH",
        command: "mv apix ~/.local/bin/",
      },
      {
        label: "Remove the quarantine attribute (first launch)",
        command: "xattr -d com.apple.quarantine ~/.local/bin/apix",
      },
      {
        label: "Verify",
        command: "apix --version",
      },
    ],
  },
  windows: {
    steps: [
      {
        label: "Extract the zip archive",
        command: "Expand-Archive apix-*-windows-msvc.zip -DestinationPath .",
      },
      {
        label: "Move apix.exe to a directory in your PATH",
        command: 'Move-Item apix.exe "$env:USERPROFILE\\AppData\\Local\\Microsoft\\WindowsApps\\"',
      },
      {
        label: "Verify",
        command: "apix --version",
      },
    ],
    note: "For the best experience on Windows, use apix inside WSL or Git Bash — box-drawing characters may not render correctly in cmd.exe.",
  },
};

export function OsTabs() {
  const [active, setActive] = useState<OS>("linux");
  const { steps, note } = CONTENT[active];

  return (
    <div>
      {/* tab bar */}
      <div className="mb-6 flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "px-4 py-2 font-mono text-sm transition-colors",
              active === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* steps */}
      <ol className="flex flex-col gap-4">
        {steps.map((step, i) => (
          <li key={step.command} className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">
              <span className="mr-2 font-mono text-primary">{i + 1}.</span>
              {step.label}
            </span>
            <InstallCommand command={step.command} />
          </li>
        ))}
      </ol>

      {note && (
        <p className="mt-4 rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Note: </span>
          {note}
        </p>
      )}
    </div>
  );
}
