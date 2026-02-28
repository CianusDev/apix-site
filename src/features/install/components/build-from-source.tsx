import { CodeBlock } from "@/components/ui/code-block";

export async function BuildFromSource() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Requires{" "}
        <a
          href="https://rustup.rs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          Rust
        </a>{" "}
        (edition 2024). Install it with:
      </p>

      <CodeBlock
        code="curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
        lang="bash"
      />

      <p className="text-sm text-muted-foreground">Then clone and build:</p>

      <CodeBlock
        code={`git clone https://github.com/CianusDev/apix.git
cd apix
cargo build --release
./target/release/apix`}
        lang="bash"
        filename="terminal"
      />

      <p className="text-sm text-muted-foreground">
        Copy the binary to your PATH:
      </p>

      <CodeBlock
        code="cp target/release/apix ~/.local/bin/"
        lang="bash"
      />
    </div>
  );
}
