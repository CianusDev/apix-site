"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface InstallCommandProps {
  command: string;
}

export function InstallCommand({ command }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-3 overflow-hidden rounded-lg border border-border bg-input px-4 py-3">
      <Terminal size={16} className="shrink-0 text-primary" />

      <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground">
        <span className="select-none text-primary">$ </span>
        {command}
      </code>

      <button
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? (
          <Check size={16} className="text-primary" />
        ) : (
          <Copy size={16} />
        )}
      </button>
    </div>
  );
}
