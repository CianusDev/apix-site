import { getAllDocs } from "@/lib/docs";
import { DocsSidebar } from "@/components/layouts/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllDocs();

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-0 px-4 sm:px-6">
      <DocsSidebar docs={docs} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
