import { Download } from "lucide-react";

const RELEASES_URL = "https://github.com/CianusDev/apix/releases/latest";

const BINARIES = [
  {
    platform: "Linux x86_64",
    file: "apix-*-x86_64-unknown-linux-gnu.tar.gz",
    os: "linux",
  },
  {
    platform: "macOS Intel",
    file: "apix-*-x86_64-apple-darwin.tar.gz",
    os: "macos",
  },
  {
    platform: "macOS Apple Silicon",
    file: "apix-*-aarch64-apple-darwin.tar.gz",
    os: "macos",
  },
  {
    platform: "Windows x86_64",
    file: "apix-*-x86_64-pc-windows-msvc.zip",
    os: "windows",
  },
];

export function BinariesTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/60">
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Platform
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              File
            </th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          {BINARIES.map((b, i) => (
            <tr
              key={b.file}
              className={i < BINARIES.length - 1 ? "border-b border-border" : ""}
            >
              <td className="px-4 py-3 text-foreground">{b.platform}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {b.file}
              </td>
              <td className="px-4 py-3 text-right">
                <a
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary transition-opacity hover:opacity-80"
                >
                  <Download size={14} />
                  <span>Releases</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
