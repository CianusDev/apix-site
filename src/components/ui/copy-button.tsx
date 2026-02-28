"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn(
        "rounded p-1.5 transition-colors",
        "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
