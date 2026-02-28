import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export async function CodeBlock({
  code,
  lang = "bash",
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "vitesse-dark",
  });

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-border bg-card text-sm">
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          {filename ?? lang}
        </span>
        <CopyButton text={code.trim()} />
      </div>

      {/* highlighted code */}
      <div
        className="overflow-x-auto  p-4 [&>pre]:bg-transparent! [&>pre]:p-0! [&>pre]:outline-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is trusted
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
