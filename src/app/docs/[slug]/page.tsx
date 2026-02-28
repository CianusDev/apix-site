import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllDocs, getDocBySlug, getDocContent } from "@/lib/docs";
import { Toc } from "@/components/ui/toc";
import { MdxPre } from "@/components/ui/mdx-pre";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.description };
}

const mdxComponents = {
  pre: MdxPre,
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return (
      <h2 id={id} className="mt-10 mb-4 text-xl font-semibold text-foreground scroll-mt-20" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return (
      <h3 id={id} className="mt-6 mb-3 text-lg font-semibold text-foreground scroll-mt-20" {...props}>
        {children}
      </h3>
    );
  },
};

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const content = await getDocContent(slug);

  return (
    <div className="flex gap-8 py-10 pl-0 lg:pl-8">
      {/* MDX content */}
      <article className="min-w-0 flex-1">
        <h1 className="mb-2 font-mono text-3xl font-bold text-foreground">
          {doc.title}
        </h1>
        <p className="mb-8 text-muted-foreground">{doc.description}</p>

        <div className="prose-neutral prose-sm prose max-w-none text-foreground/90 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_p]:mb-4 [&_p]:leading-relaxed [&_table]:w-full [&_table]:text-sm [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </article>

      {/* TOC */}
      <Toc headings={doc.headings} />
    </div>
  );
}
