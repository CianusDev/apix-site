import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TuiScreenshotProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TuiScreenshot({
  title = "apix",
  children,
  className,
}: TuiScreenshotProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card text-sm shadow-xl",
        className,
      )}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto font-mono text-xs text-muted-foreground">
          {title}
        </span>
      </div>

      {/* content */}
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-foreground/90">
        {children}
      </pre>
    </div>
  );
}
