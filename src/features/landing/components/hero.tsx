import Link from "next/link";
import type { Route } from "next";
import { TuiScreenshot } from "@/components/ui/tui-screenshot";
import Image from "next/image";

const TUI_ASCII = `┌─ APIX ─────────────────────────────────────────────────────────────┐
│  POST  https://api.example.com/users              [ENV:prod]       │
└────────────────────────────────────────────────────────────────────┘
┌─ Request ──────────────────────┐┌─ Response ────────────────────────┐
│ 1:Params│2:Headers│3:Body│4:Auth ││ ● 201 Created   POST              │
│────────────────────────────────││ 1:Body│2:Headers│3:Cookies         │
│ ▸ Authorization: Bearer tok…  ││──────────────────────────────────── │
│   Content-Type: application/… ││ {                                   │
│                                ││   "id": 42,                        │
│                                ││   "name": "Alice",                 │
│                                ││   "token": "eyJhbGci..."           │
│                                ││ }                                   │
├────────────────────────────────┴┴────────────────────────────────────┤
│ h:History  c:Collections  e:Envs  u:URL  m:method  s:send  q:quit   │
└──────────────────────────────────────────────────────────────────────┘`;

const BADGES = [
  {
    label: "Release",
    src: "https://img.shields.io/github/v/release/CianusDev/apix?style=flat-square&colorA=0a0a0a&colorB=22c55e&color=22c55e",
    href: "https://github.com/CianusDev/apix/releases",
  },
  {
    label: "License",
    src: "https://img.shields.io/github/license/CianusDev/apix?style=flat-square&colorA=0a0a0a&colorB=22c55e&color=22c55e",
    href: "https://github.com/CianusDev/apix/blob/main/LICENSE",
  },
  {
    label: "CI",
    src: "https://img.shields.io/github/actions/workflow/status/CianusDev/apix/release.yml?style=flat-square&label=CI&colorA=0a0a0a",
    href: "https://github.com/CianusDev/apix/actions",
  },
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
      {/* text column */}
      <div className="flex flex-col gap-6">
        {/* badges */}
        <div className="flex flex-wrap gap-2">
          {BADGES.map((badge) => (
            <a
              key={badge.label}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={badge.label}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={badge.src} alt={badge.label} height={20} />
            </a>
          ))}
        </div>

        {/* title */}
        <div>
          <h1 className="font-mono text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
            <span className="text-primary">›</span> apix
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            A lightweight Postman alternative
            <br />
            <span className="text-foreground">for your terminal.</span>
          </p>
        </div>

        {/* description */}
        <p className="text-base text-muted-foreground">
          Send HTTP requests, manage collections and environments — all without
          leaving your terminal. Written in Rust, blazing fast.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={"/install" as Route}
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            $ install
          </Link>
          <Link
            href={"/docs" as Route}
            className="inline-flex items-center rounded-md border border-border px-5 py-2.5 font-mono text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Read the docs →
          </Link>
        </div>
      </div>

      {/* TUI screenshot column */}
      <TuiScreenshot className="hidden lg:block">
        <Image
          src="/apix-screenshot.png"
          alt="apix TUI screenshot"
          width={1200}
          height={800}
          className="h-auto w-full scale-108 object-cover"
        />
      </TuiScreenshot>
    </section>
  );
}
