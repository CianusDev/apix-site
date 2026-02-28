import { readFile } from "fs/promises";
import path from "path";

export interface DocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  headings: DocHeading[];
}

export const DOCS: DocMeta[] = [
  {
    slug: "installation",
    title: "Installation",
    description: "Install apix on Linux, macOS or Windows in seconds.",
    headings: [
      { id: "one-liner", text: "One-liner", level: 2 },
      { id: "manual-download", text: "Manual download", level: 2 },
      { id: "build-from-source", text: "Build from source", level: 2 },
    ],
  },
  {
    slug: "features",
    title: "Features",
    description: "Everything apix can do — HTTP, auth, environments and more.",
    headings: [
      { id: "http-methods", text: "HTTP methods", level: 2 },
      { id: "query-params-headers", text: "Query params & headers", level: 2 },
      { id: "body-editor", text: "Body editor", level: 2 },
      { id: "authentication", text: "Authentication", level: 2 },
      { id: "environments", text: "Environments", level: 2 },
      { id: "collections", text: "Collections", level: 2 },
      { id: "history", text: "History", level: 2 },
      { id: "response-viewer", text: "Response viewer", level: 2 },
    ],
  },
  {
    slug: "keybindings",
    title: "Keybindings",
    description: "Full keyboard reference for every context in apix.",
    headings: [
      { id: "global", text: "Global", level: 2 },
      { id: "request-panel", text: "Request panel", level: 2 },
      { id: "response-panel", text: "Response panel", level: 2 },
      { id: "body-editor", text: "Body editor", level: 2 },
      { id: "drawers", text: "Drawers", level: 2 },
    ],
  },
  {
    slug: "storage",
    title: "Data storage",
    description: "Where and how apix stores your data locally.",
    headings: [
      { id: "location", text: "Location", level: 2 },
      { id: "history-json", text: "history.json", level: 2 },
      { id: "collections-json", text: "collections.json", level: 2 },
      { id: "environments-json", text: "environments.json", level: 2 },
    ],
  },
  {
    slug: "tech-stack",
    title: "Tech stack",
    description: "The Rust libraries powering apix under the hood.",
    headings: [
      { id: "language", text: "Language", level: 2 },
      { id: "tui", text: "TUI", level: 2 },
      { id: "http", text: "HTTP", level: 2 },
      { id: "async", text: "Async", level: 2 },
      { id: "serialization", text: "Serialization", level: 2 },
    ],
  },
  {
    slug: "faq",
    title: "FAQ",
    description: "Frequently asked questions about apix.",
    headings: [
      { id: "why-apix-over-postman", text: "Why apix over Postman?", level: 2 },
      { id: "does-it-work-on-windows", text: "Does it work on Windows?", level: 2 },
      { id: "how-do-i-update-apix", text: "How do I update apix?", level: 2 },
      { id: "where-is-my-data-stored", text: "Where is my data stored?", level: 2 },
      { id: "how-can-i-contribute", text: "How can I contribute?", level: 2 },
    ],
  },
];

export function getAllDocs(): DocMeta[] {
  return DOCS;
}

export function getDocBySlug(slug: string): DocMeta | undefined {
  return DOCS.find((d) => d.slug === slug);
}

export async function getDocContent(slug: string): Promise<string> {
  const filepath = path.join(process.cwd(), "content", "docs", `${slug}.mdx`);
  return readFile(filepath, "utf-8");
}
