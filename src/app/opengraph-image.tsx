import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "apix — A lightweight Postman alternative for your terminal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TUI = `┌─ APIX ──────────────────────────────────────────────────────────────────┐
│  POST  https://api.example.com/users                       [ENV:prod]   │
└─────────────────────────────────────────────────────────────────────────┘
┌─ Request ───────────────────┐┌─ Response ──────────────────────────────┐
│ 1:Params│2:Headers│3:Body   ││ ● 201 Created   POST                    │
│─────────────────────────────││─────────────────────────────────────────│
│ ▸ Authorization: Bearer t…  ││ {                                        │
│   Content-Type: applic…     ││   "id": 42,                             │
│                             ││   "name": "Alice"                       │
│                             ││ }                                        │
├─────────────────────────────┴┴──────────────────────────────────────────┤
│  h:History  c:Collections  e:Envs  s:send  Tab:switch  q:quit          │
└─────────────────────────────────────────────────────────────────────────┘`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "64px 72px",
          gap: "24px",
          fontFamily: "monospace",
        }}
      >
        {/* title */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: 72, fontWeight: 700, color: "#22c55e" }}>
            ›
          </span>
          <span style={{ fontSize: 72, fontWeight: 700, color: "#e8e8e8" }}>
            apix
          </span>
        </div>

        {/* tagline */}
        <div style={{ fontSize: 28, color: "#6b7280", letterSpacing: "-0.01em" }}>
          A lightweight Postman alternative for your terminal
        </div>

        {/* TUI preview */}
        <div
          style={{
            marginTop: "16px",
            background: "#111",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "20px 24px",
            fontSize: "13px",
            color: "#9ca3af",
            whiteSpace: "pre",
            lineHeight: 1.6,
            width: "100%",
          }}
        >
          {TUI}
        </div>
      </div>
    ),
    { ...size },
  );
}
