import type { ReactElement } from "react";
import { CodeBlock } from "./code-block";

interface CodeElementProps {
  className?: string;
  children?: string;
}

interface MdxPreProps {
  children?: ReactElement<CodeElementProps>;
}

export async function MdxPre({ children }: MdxPreProps) {
  const lang =
    (children?.props?.className ?? "").replace("language-", "") || "bash";
  const code = children?.props?.children ?? "";

  return <CodeBlock code={String(code)} lang={lang} />;
}
